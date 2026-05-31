import React, { useState } from "react";

const NearbyGyms = () => {
  const [location, setLocation] = useState("");
  const gyms = [
    { name: "Gym A", address: "123 Main St", slots: ["9AM-10AM", "2PM-3PM"] },
    { name: "Gym B", address: "456 Elm St", slots: ["10AM-11AM", "4PM-5PM"] },
  ];

  return (
    <section>
      <h2 className="text-4xl font-bold mb-8 text-yellow-300 text-center">
        Nearby Gyms & Slots
      </h2>
      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Enter location (e.g., New York)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 rounded-lg text-black"
        />
        <button className="ml-4 bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition">
          Search
        </button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {gyms.map((gym) => (
          <div
            key={gym.name}
            className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <h3 className="text-xl font-semibold text-red-500">{gym.name}</h3>
            <p>{gym.address}</p>
            <p>Slots: {gym.slots.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NearbyGyms;
