import React from "react";

const Trainers = () => {
  const trainers = [
    { name: "John", specialty: "Weightlifting", rating: 4.5 },
    { name: "Sarah", specialty: "Yoga", rating: 4.8 },
  ];

  return (
    <section className="text-center">
      <h2 className="text-4xl font-bold mb-8 text-yellow-300">Gym Trainers</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {trainers.map((trainer) => (
          <div
            key={trainer.name}
            className="bg-gradient-to-br from-purple-400 to-pink-500 p-6 rounded-lg shadow-xl hover:scale-105 transition transform duration-300"
          >
            <h3 className="text-2xl font-semibold">{trainer.name}</h3>
            <p>Specialty: {trainer.specialty}</p>
            <p>Rating: {trainer.rating}/5 ⭐</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Trainers;
