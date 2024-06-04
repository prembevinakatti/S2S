import React, { useEffect, useState } from "react";

export default function DistanceCalculator({ startCoord, endCoord }) {
  const [pointA, setPointA] = useState("");
  const [pointB, setPointB] = useState("");
  const [calculatedDistance, setCalculatedDistance] = useState(undefined);
  const [averageTime, setAverageTime] = useState(undefined);

  const calculateDistance = () => {``
    let [lat1, lon1] = pointA.split(",");
    let [lat2, lon2] = pointB.split(",");
    let lat1num = parseFloat(lat1);
    let lon1num = parseFloat(lon1);
    let lat2num = parseFloat(lat2);
    let lon2num = parseFloat(lon2);

    if (isNaN(lat1num) || isNaN(lon1num) || isNaN(lat2num) || isNaN(lon2num)) {
      return <div>
        <p>location not found</p>
      </div>
    }

    let R = 6371;
    let dLat = ((lat2num - lat1num) * Math.PI) / 180;
    let dLon = ((lon2num - lon1num) * Math.PI) / 180;
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1num * Math.PI) / 180) *
        Math.cos((lat2num * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    setCalculatedDistance(Number(distance.toFixed(2)));

    let averageTimeInHours = distance / 60;
    setAverageTime(Math.round(averageTimeInHours * 60));
  };

  useEffect(() => {
    setPointA(startCoord);
    setPointB(endCoord);
    calculateDistance();
  }, [[startCoord, endCoord]]);

  return (
    <main className="w-full h-fit flex-col flex items-center justify-center">
      <div className=" p-10 border text-white border-slate-600 rounded-lg shadow-lg bg-[#1D232A]">
      <div className="locations flex items-center justify-center gap-5">
        <p className="text-2xl font-semibold">
          From : <span className="font-serif">Locations</span>
        </p>
        <p className="text-2xl font-semibold">
          To : <span className="font-serif">Locations</span>
        </p>
      </div>
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
      </div>
    </main>
  );
}
