import React, { useState } from 'react';

export default function Home() {
  const [pointA, setPointA] = useState('');
  const [pointB, setPointB] = useState('');
  const [calculatedDistance, setCalculatedDistance] = useState(undefined);
  const [averageTime, setAverageTime] = useState(undefined);
  const [invalidInput, setInvalidInput] = useState(false);

  const calculateDistance = () => {
    let [lat1, lon1] = pointA.split(',');
    let [lat2, lon2] = pointB.split(',');
    let lat1num = parseFloat(lat1);
    let lon1num = parseFloat(lon1);
    let lat2num = parseFloat(lat2);
    let lon2num = parseFloat(lon2);

    if (isNaN(lat1num) || isNaN(lon1num) || isNaN(lat2num) || isNaN(lon2num)) {
      setInvalidInput(true);
      return;
    }

    setInvalidInput(false);

    let R = 6371; // km
    let dLat = (lat2num - lat1num) * Math.PI / 180;
    let dLon = (lon2num - lon1num) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1num * Math.PI / 180) * Math.cos(lat2num * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    setCalculatedDistance(Number(distance.toFixed(2)));

    // Example of calculating average time for driving (in minutes)
    let averageTimeInHours = distance / 60; // Assuming an average speed of 60 km/h
    setAverageTime(Math.round(averageTimeInHours * 60)); // Convert to minutes
  };

  const handlePointAChange = (event) => {
    setPointA(event.target.value);
  }

  const handlePointBChange = (event) => {
    setPointB(event.target.value);
  }

  return (
    <main className="mt-40">
      <h1 className="text-6xl font-extrabold text-center text-gradient bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 tracking-tight leading-tight">
        Distance Calculator
      </h1>
      <p className="text-center m-2 p-2 text-2xl font-semibold mt-4">
        Calculates distance between two points using longitude and latitude coordinates
      </p>
      <div className="flex justify-center">
        <label htmlFor="pointA" className="text-m font-semibold mt-4">
          Point A:
        </label>
        <input
          type="text"
          id="pointA"
          placeholder="37.773972,-122.431297"
          className="p-2 m-2 border border-gray-300 rounded-md"
          value={pointA}
          onChange={handlePointAChange}
        />
        <label htmlFor="pointB" className="text-m font-semibold mt-4">
          Point B:
        </label>
        <input
          type="text"
          id="pointB"
          placeholder="34.052235,-118.243683"
          className="p-2 m-2 border border-gray-300 rounded-md"
          value={pointB}
          onChange={handlePointBChange}
        />
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="px-4 py-2 m-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          onClick={calculateDistance}
        >
          Calculate
        </button>
      </div>

      {invalidInput && (
        <div className="flex justify-center mt-4">
          <p className="text-2xl text-red-500">Invalid input. Please enter valid latitude and longitude values.</p>
        </div>
      )}

      {calculatedDistance !== undefined && (
        <div className="flex justify-center mt-4">
          <p className="text-2xl font-semibold">
            Distance: {calculatedDistance} km
          </p>
        </div>
      )}

      {averageTime !== undefined && (
        <div className="flex justify-center mt-4">
          <p className="text-2xl font-semibold">
            Average Time: {averageTime} minutes (assuming driving mode)
          </p>
        </div>
      )}
    </main>
  );
}
