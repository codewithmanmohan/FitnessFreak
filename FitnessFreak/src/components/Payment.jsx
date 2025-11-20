import React, { useState } from "react";

const Payment = () => {
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();
    alert("Payment processed!");
  };

  return (
    <section className="max-w-md mx-auto bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment</h2>
      <form onSubmit={handlePayment}>
        <input
          type="text"
          placeholder="Card Number"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Expiry (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Pay
        </button>
      </form>
    </section>
  );
};

export default Payment;
