import React, { useState } from "react";

const SupplementShop = () => {
  const [cart, setCart] = useState([]);
  const supplements = [
    { name: "Protein Powder", price: "$20" },
    { name: "Vitamins", price: "$15" },
  ];

  const addToCart = (item) => setCart([...cart, item]);

  return (
    <section className="text-center">
      <h2 className="text-4xl font-bold mb-8 text-yellow-300">
        Supplement Shop
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mb-6">
        {supplements.map((supp) => (
          <div
            key={supp.name}
            className="bg-gradient-to-br from-teal-400 to-cyan-500 p-6 rounded-lg shadow-xl hover:scale-105 transition transform duration-300"
          >
            <h3 className="text-2xl font-semibold">{supp.name}</h3>
            <p>{supp.price}</p>
            <button
              onClick={() => addToCart(supp.name)}
              className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <p className="text-lg">Cart: {cart.join(", ") || "Empty"}</p>
    </section>
  );
};

export default SupplementShop;
