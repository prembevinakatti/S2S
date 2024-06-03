import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';

const DistanceCalculator = ({ originCoords, destinationCoords }) => {
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [route, setRoute] = useState(null);

  const calculateDistance = async (originCoords, destinationCoords) => {
    const apiKey = "5b3ce3597851110001cf6248844e67d82eb8433b88ae8c05af8e5064";
    const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

    const body = {
      coordinates: [
        [originCoords.lng, originCoords.lat],
        [destinationCoords.lng, destinationCoords.lat]
      ]
    };

    try {
      const response = await axios.post(url, body, {
        headers: {
          Authorization: apiKey,
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;

      if (data.routes && data.routes.length > 0) {
        setDistance(data.routes[0].summary.distance / 1000); // Convert to km
        setDuration(data.routes[0].summary.duration / 60); // Convert to minutes
        setRoute(data.routes[0].geometry.coordinates.map(coord => ({
          lat: coord[1],
          lng: coord[0]
        })));
      } else {
        alert('Error fetching data. Please check your inputs.');
      }
    } catch (error) {
      console.error('Error fetching the distance data', error);
    }
  };

  // Calculate distance and route when the component mounts or coordinates change
  React.useEffect(() => {
    if (originCoords && destinationCoords) {
      calculateDistance(originCoords, destinationCoords);
    }
  }, [originCoords, destinationCoords]);

  return (
    <div>
      <h1>Distance Calculator</h1>

      {distance && duration && (
        <div>
          <h2>Results</h2>
          <p>Distance: {distance.toFixed(2)} km</p>
          <p>Duration: {duration.toFixed(2)} minutes</p>
        </div>
      )}

      {originCoords && destinationCoords && (
        <MapContainer center={originCoords} zoom={10} style={{ height: '400px', width: '800px' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker position={originCoords} />
          <Marker position={destinationCoords} />
          {route && <Polyline positions={route} color="blue" />}
        </MapContainer>
      )}
    </div>
  );
};

export default DistanceCalculator;
