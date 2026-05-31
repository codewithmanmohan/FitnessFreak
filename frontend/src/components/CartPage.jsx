import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ArrowLeft, Check } from "lucide-react";

export default function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    shippingAddress: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "credit-card",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveItem(productId);
    } else {
      const updatedCart = cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (
      !formData.shippingAddress ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all shipping details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to place order");
        navigate("/login");
        return;
      }

      // Create order
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems,
          totalAmount: total,
          shippingAddress: formData.shippingAddress,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setOrderPlaced(true);
        localStorage.removeItem("cartItems");
        setTimeout(() => {
          navigate("/supplement-shop");
        }, 3000);
      } else {
        alert("Error placing order: " + result.message);
      }
    } catch (error) {
      alert("Error placing order: " + error.message);
      console.error(error);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#050816] text-white flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-400 text-lg mb-8">
            Thank you for your order. You will be redirected to the shop shortly.
          </p>
          <div className="text-cyan-400 text-xl font-semibold">
            Total: ₹{total}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate("/supplement-shop")}
            className="p-2 hover:bg-slate-700 rounded-lg transition text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-[#0f172a] rounded-lg border border-slate-700 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Order Summary
              </h2>

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <button
                    onClick={() => navigate("/supplement-shop")}
                    className="mt-4 px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition font-semibold"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                    >
                      {/* Product Image */}
                      {item.image && (
                        <img
                          src={item.image.startsWith("http") ? item.image : `http://localhost:5000${item.image}`}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                      )}

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-2">
                          {item.description}
                        </p>
                        <p className="text-cyan-400 font-semibold">
                          ₹{item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item._id, item.quantity + 1)
                          }
                          className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-white"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-right min-w-20">
                        <p className="text-gray-400 text-sm">Subtotal</p>
                        <p className="text-lg font-bold text-cyan-400">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item._id)}
                        className="p-2 hover:bg-red-600/20 rounded text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Shipping Form */}
            {cartItems.length > 0 && (
              <div className="bg-[#0f172a] rounded-lg border border-slate-700 p-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Shipping Address
                </h2>

                <form className="space-y-4">
                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Street Address *
                    </label>
                    <textarea
                      name="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      rows="3"
                      className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g., Mumbai"
                        className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>

                    {/* State */}
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="e.g., Maharashtra"
                        className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>

                    {/* Pincode */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-white mb-2">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="e.g., 400001"
                        className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Payment Method *
                    </label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                    >
                      <option value="credit-card">Credit Card</option>
                      <option value="debit-card">Debit Card</option>
                      <option value="upi">UPI</option>
                      <option value="wallet">Digital Wallet</option>
                      <option value="cod">Cash on Delivery</option>
                    </select>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-[#0f172a] rounded-lg border border-slate-700 p-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Price Details
                  </h3>

                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-700">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Discount</span>
                      <span className="text-green-400">-₹0</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-4 rounded-lg border border-cyan-500/30 mb-6">
                    <p className="text-gray-400 text-sm mb-2">Total Payable</p>
                    <p className="text-3xl font-bold text-cyan-400">₹{total}</p>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 rounded-lg font-bold transition"
                  >
                    Place Order
                  </button>

                  <button
                    onClick={() => navigate("/supplement-shop")}
                    className="w-full mt-3 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
