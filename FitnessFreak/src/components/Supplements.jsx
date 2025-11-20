import React, { useState, useEffect } from "react";
import { ShoppingCart, Star, Filter, Search } from "lucide-react";
import { supplementsAPI } from "../utils/api";

export default function Supplements() {
  const [supplements, setSupplements] = useState([]);
  const [filteredSupplements, setFilteredSupplements] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSupplements = async () => {
      try {
        const data = await supplementsAPI.getAll();
        setSupplements(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch supplements");
        console.error("Error fetching supplements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplements();
  }, []);

  useEffect(() => {
    let filtered = supplements;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((s) => s.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSupplements(filtered);
  }, [supplements, selectedCategory, searchTerm]);

  const categories = [
    { id: "all", label: "All Products" },
    { id: "protein", label: "Protein" },
    { id: "amino", label: "Amino Acids" },
    { id: "creatine", label: "Creatine" },
    { id: "preworkout", label: "Pre-Workout" },
    { id: "vitamins", label: "Vitamins" },
    { id: "omega", label: "Omega-3" },
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-[#050816] py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-0">
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3">
              <span className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] bg-clip-text text-transparent">
                Premium Supplements
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              High-quality supplements to support your fitness goals
            </p>
          </div>
          <div className="relative">
            <ShoppingCart className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            <div className="relative">
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cart.length}
              </span>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-center mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-[#22c55e]/30 border-t-[#22c55e] rounded-full animate-spin"></div>
            </div>
            <p className="text-gray-400 mt-4">Loading supplements...</p>
          </div>
        )}

        {!loading && (
          <>
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search supplements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-700 text-white placeholder-gray-400 rounded-lg pl-12 pr-4 py-3 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="mb-12 flex gap-3 overflow-x-auto pb-4">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/50"
                      : "bg-slate-700 text-gray-300 border border-slate-600 hover:border-cyan-500"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            {filteredSupplements.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSupplements.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl overflow-hidden border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-cyan-600 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        ${product.price}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-6">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-500"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 text-sm">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all font-bold flex items-center justify-center gap-2 group"
                      >
                        <ShoppingCart className="w-4 h-4 group-hover:scale-110 transition" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No supplements found.</p>
              </div>
            )}

            {/* Info Cards */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Quality Assured",
                  description: "All supplements are third-party tested",
                },
                {
                  title: "Fast Delivery",
                  description: "Free shipping on orders over $50",
                },
                {
                  title: "Money Back",
                  description: "30-day satisfaction guarantee",
                },
              ].map((info, i) => (
                <div
                  key={i}
                  className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 text-center"
                >
                  <h4 className="text-lg font-bold text-white mb-2">
                    {info.title}
                  </h4>
                  <p className="text-gray-400">{info.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
