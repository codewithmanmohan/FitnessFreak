import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  X,
  Trash2,
  Upload,
} from "lucide-react";

// Sample supplement data
const SUPPLEMENT_CATEGORIES = {
  protein: {
    name: "Protein",
    color: "from-blue-500 to-cyan-500",
    products: [
      {
        id: "p1",
        name: "Whey Protein Isolate",
        price: 1299,
        image: "https://images.unsplash.com/photo-1585879418456-2fa80ef59a4b?w=400&h=300&fit=crop",
        benefits: "Fast absorption, muscle recovery",
        description: "Premium whey protein isolate with 90% protein content. Ideal for post-workout recovery and muscle building.",
        manufacturingDate: "2024-01-15",
        expiryDate: "2025-01-15",
      },
      {
        id: "p2",
        name: "Casein Protein Night",
        price: 1499,
        image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd94837?w=400&h=300&fit=crop",
        benefits: "Slow release, overnight recovery",
        description: "Micellar casein for sustained amino acid release. Perfect for night-time muscle recovery.",
        manufacturingDate: "2024-02-10",
        expiryDate: "2025-02-10",
      },
      {
        id: "p3",
        name: "Plant-Based Protein",
        price: 1399,
        image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop",
        benefits: "Vegan, complete amino profile",
        description: "100% plant-based protein blend from pea, rice, and hemp. Complete amino acid profile.",
        manufacturingDate: "2024-01-20",
        expiryDate: "2025-01-20",
      },
    ],
  },
  aminoAcids: {
    name: "Amino Acids",
    color: "from-purple-500 to-pink-500",
    products: [
      {
        id: "a1",
        name: "BCAA Complex",
        price: 899,
        image: "https://images.unsplash.com/photo-1584308666744-24d5f15714ae?w=400&h=300&fit=crop",
        benefits: "Muscle preservation, reduced fatigue",
        description: "Branched-chain amino acids in 2:1:1 ratio. Supports muscle growth and endurance.",
        category: "aminoAcids",
        manufacturingDate: "2024-01-25",
        expiryDate: "2025-01-25",
      },
      {
        id: "a2",
        name: "EAA Stack",
        price: 1099,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        benefits: "Complete amino acids, better recovery",
        description: "All 9 essential amino acids in perfect balance for maximum muscle growth.",
        category: "aminoAcids",
        manufacturingDate: "2024-02-01",
        expiryDate: "2025-02-01",
      },
      {
        id: "a3",
        name: "L-Glutamine",
        price: 799,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=300&fit=crop",
        benefits: "Gut health, immune support",
        description: "Pure L-glutamine powder for digestive health and immune system support.",
        category: "aminoAcids",
        manufacturingDate: "2024-01-30",
        expiryDate: "2025-01-30",
      },
    ],
  },
  creatine: {
    name: "Creatine",
    color: "from-red-500 to-orange-500",
    products: [
      {
        id: "c1",
        name: "Creatine Monohydrate",
        price: 599,
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        benefits: "Strength, power output",
        description: "Micronized creatine monohydrate for improved ATP production and performance.",
        category: "creatine",
        manufacturingDate: "2024-01-10",
        expiryDate: "2025-01-10",
      },
      {
        id: "c2",
        name: "Creatine HCL",
        price: 799,
        image: "https://images.unsplash.com/photo-1517836357463-d25ddefcdd50?w=400&h=300&fit=crop",
        benefits: "Better absorption, less bloating",
        description: "Creatine hydrochloride with superior absorption and bioavailability.",
        category: "creatine",
        manufacturingDate: "2024-02-05",
        expiryDate: "2025-02-05",
      },
      {
        id: "c3",
        name: "Buffered Creatine",
        price: 899,
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
        benefits: "pH-buffered, stable formula",
        description: "pH-buffered creatine for enhanced stability and reduced side effects.",
        category: "creatine",
        manufacturingDate: "2024-01-28",
        expiryDate: "2025-01-28",
      },
    ],
  },
  preWorkout: {
    name: "Pre-Workout",
    color: "from-yellow-500 to-red-500",
    products: [
      {
        id: "pw1",
        name: "Energy Blast",
        price: 1199,
        image: "https://images.unsplash.com/photo-1577720643272-265f434e32b9?w=400&h=300&fit=crop",
        benefits: "Energy, focus, pump",
        description: "Comprehensive pre-workout with caffeine, beta-alanine, and citrulline malate.",
        category: "preWorkout",
        manufacturingDate: "2024-02-08",
        expiryDate: "2025-02-08",
      },
      {
        id: "pw2",
        name: "Pump Inducer",
        price: 1099,
        image: "https://images.unsplash.com/photo-1583394883987-461ff4598ee3?w=400&h=300&fit=crop",
        benefits: "Vascularity, endurance",
        description: "Nitric oxide booster for incredible muscle pump and blood flow.",
        category: "preWorkout",
        manufacturingDate: "2024-01-22",
        expiryDate: "2025-01-22",
      },
      {
        id: "pw3",
        name: "Caffeine-Free Pump",
        price: 999,
        image: "https://images.unsplash.com/photo-1505576399279-1a202fa1f5cc?w=400&h=300&fit=crop",
        benefits: "Pump without stimulants",
        description: "Stimulant-free pre-workout formula for evening training sessions.",
        category: "preWorkout",
        manufacturingDate: "2024-02-12",
        expiryDate: "2025-02-12",
      },
    ],
  },
  vitamins: {
    name: "Vitamins",
    color: "from-green-500 to-emerald-500",
    products: [
      {
        id: "v1",
        name: "Multivitamin Complex",
        price: 699,
        image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde0d?w=400&h=300&fit=crop",
        benefits: "Overall health, immunity",
        description: "Complete multivitamin and mineral supplement for optimal health.",
        category: "vitamins",
        manufacturingDate: "2024-01-18",
        expiryDate: "2025-01-18",
      },
      {
        id: "v2",
        name: "Vitamin D3 + K2",
        price: 599,
        image: "https://images.unsplash.com/photo-1552546519-ff91f1e9b6d7?w=400&h=300&fit=crop",
        benefits: "Bone health, calcium absorption",
        description: "Combined vitamin D3 and K2 for optimal bone health and calcium metabolism.",
        category: "vitamins",
        manufacturingDate: "2024-02-03",
        expiryDate: "2025-02-03",
      },
      {
        id: "v3",
        name: "B-Complex Energy",
        price: 549,
        image: "https://images.unsplash.com/photo-1517836357463-d25ddefcdd50?w=400&h=300&fit=crop",
        benefits: "Energy, metabolism",
        description: "Full spectrum B vitamins for energy production and metabolic health.",
        category: "vitamins",
        manufacturingDate: "2024-01-12",
        expiryDate: "2025-01-12",
      },
    ],
  },
  omega3: {
    name: "Omega-3",
    color: "from-indigo-500 to-blue-500",
    products: [
      {
        id: "o1",
        name: "Fish Oil Omega-3",
        price: 799,
        image: "https://images.unsplash.com/photo-1584308666744-24d5f15714ae?w=400&h=300&fit=crop",
        benefits: "Heart health, brain function",
        description: "High-potency fish oil with EPA and DHA for cardiovascular and cognitive health.",
        category: "omega3",
        manufacturingDate: "2024-01-16",
        expiryDate: "2025-01-16",
      },
      {
        id: "o2",
        name: "Vegan Algae Omega-3",
        price: 899,
        image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&h=300&fit=crop",
        benefits: "Vegan, sustainable, brain health",
        description: "Plant-based algae omega-3 supplement rich in EPA and DHA.",
        category: "omega3",
        manufacturingDate: "2024-02-07",
        expiryDate: "2025-02-07",
      },
      {
        id: "o3",
        name: "Krill Oil Premium",
        price: 1299,
        image: "https://images.unsplash.com/photo-1614613535308-eb5fbd8952f7?w=400&h=300&fit=crop",
        benefits: "Superior absorption, antioxidants",
        description: "Premium krill oil with astaxanthin for superior absorption and antioxidant benefits.",
        category: "omega3",
        manufacturingDate: "2024-02-10",
        expiryDate: "2025-02-10",
      },
    ],
  },
};

// Product Card Component
const ProductCard = ({ product, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-[#0f172a] rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition group">
      {/* Image Container */}
      <div className="relative h-48 bg-slate-800 overflow-hidden">
        <img
          src={imageError ? "https://via.placeholder.com/400x300?text=No+Image" : product.image}
          alt={product.name}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-2 right-2 bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          ₹{product.price}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-2">
          <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full">
            {SUPPLEMENT_CATEGORIES[product.category]?.name || "Supplement"}
          </span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Benefits */}
        <p className="text-sm text-cyan-400 mb-2">
          ✓ {product.benefits}
        </p>

        {/* Description */}
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-500">
          <div>
            <p className="text-gray-400">Mfg:</p>
            <p>{new Date(product.manufacturingDate).toLocaleDateString("en-IN")}</p>
          </div>
          <div>
            <p className="text-gray-400">Exp:</p>
            <p>{new Date(product.expiryDate).toLocaleDateString("en-IN")}</p>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 rounded-lg font-semibold transition flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Add Supplement Modal
const AddSupplementModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    benefits: "",
    description: "",
    category: "protein",
    manufacturingDate: "",
    expiryDate: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.benefits ||
      !formData.description ||
      !formData.manufacturingDate ||
      !formData.expiryDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add supplements");
        return;
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      data.append("benefits", formData.benefits);
      data.append("manufacturingDate", formData.manufacturingDate);
      data.append("expiryDate", formData.expiryDate);
      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch("http://localhost:5000/api/supplements", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        alert("Supplement added successfully!");
        onAdd();
        setFormData({
          name: "",
          price: "",
          benefits: "",
          description: "",
          category: "protein",
          manufacturingDate: "",
          expiryDate: "",
          image: null,
        });
        setImagePreview("");
        onClose();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Error adding supplement: " + error.message);
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f172a] rounded-lg border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-slate-700 bg-[#0f172a]">
          <h2 className="text-2xl font-bold text-white">Add New Supplement</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-700 rounded-lg transition text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Product Image <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-slate-600 rounded-lg hover:border-cyan-500 transition cursor-pointer bg-slate-800/50">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-6 h-6 text-cyan-400 mb-1" />
                    <span className="text-sm text-gray-400">Click to upload image</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-lg object-cover border-2 border-cyan-500"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Product Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Premium Whey Protein"
                className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Price (₹) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="e.g., 1299"
                className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
              >
                {Object.entries(SUPPLEMENT_CATEGORIES).map(([key, cat]) => (
                  <option key={key} value={key}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturing Date */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Manufacturing Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="manufacturingDate"
                value={formData.manufacturingDate}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Expiry Date <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
              />
            </div>
          </div>

          {/* Benefits */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Benefits (short) <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="benefits"
              value={formData.benefits}
              onChange={handleInputChange}
              placeholder="e.g., Muscle growth, fast absorption"
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed product description..."
              rows="4"
              className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-lg transition font-semibold text-white"
            >
              Add Supplement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Cart Component
const CartSidebar = ({ items, onRemoveItem, onUpdateQuantity }) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    navigate("/cart");
  };

  return (
    <div className="bg-[#0f172a] rounded-lg border border-slate-700 h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-cyan-500" />
          Cart ({itemCount})
        </h3>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Your cart is empty</p>
        ) : (
          items.map((item) => {
            const itemId = item._id || item.id;
            return (
            <div
              key={itemId}
              className="bg-slate-800/50 p-3 rounded-lg border border-slate-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-sm font-semibold text-white flex-1 pr-2 line-clamp-2">
                  {item.name}
                </h4>
                <button
                  onClick={() => onRemoveItem(itemId)}
                  className="p-1 hover:bg-red-600/20 rounded text-red-400 hover:text-red-300 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-cyan-400 font-semibold">
                  ₹{item.price}
                </span>
                <span className="text-gray-400">
                  x{item.quantity}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-700/50 rounded">
                <button
                  onClick={() =>
                    onUpdateQuantity(itemId, Math.max(1, item.quantity - 1))
                  }
                  className="px-2 py-1 text-cyan-400 hover:text-cyan-300"
                >
                  −
                </button>
                <span className="flex-1 text-center text-white">
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    onUpdateQuantity(itemId, item.quantity + 1)
                  }
                  className="px-2 py-1 text-cyan-400 hover:text-cyan-300"
                >
                  +
                </button>
              </div>

              <p className="text-sm text-gray-400 mt-2 text-right">
                Subtotal: ₹{item.price * item.quantity}
              </p>
            </div>
            );
          })
        )}
      </div>

      {/* Footer - Total */}
      {items.length > 0 && (
        <div className="p-4 border-t border-slate-700">
          <div className="bg-linear-to-r from-cyan-500/20 to-blue-500/20 p-3 rounded-lg border border-cyan-500/30 mb-3">
            <p className="text-gray-400 text-sm mb-1">Final Bill</p>
            <p className="text-3xl font-bold text-cyan-400">
              ₹{total}
            </p>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-3 rounded-lg font-bold transition"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

// Main Component
export default function SupplementShop() {
  const [cartItems, setCartItems] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const productId = product._id || product.id;
      const existingItem = prev.find((item) => (item._id || item.id) === productId);
      if (existingItem) {
        return prev.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => (item._id || item.id) !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          (item._id || item.id) === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  // Fetch ALL supplements on mount
  useEffect(() => {
    fetchAllSupplements();
  }, []);

  const fetchAllSupplements = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await fetch("http://localhost:5000/api/supplements", { headers });
      const data = await response.json();

      if (data.success && data.supplements && data.supplements.length > 0) {
        setSupplements(data.supplements);
      } else {
        // Fallback to mock data - get all products from all categories
        const allProducts = Object.values(SUPPLEMENT_CATEGORIES)
          .flatMap(cat => cat.products);
        setSupplements(allProducts);
      }
    } catch (err) {
      console.error("API Error:", err.message);
      // Fallback to mock data
      const allProducts = Object.values(SUPPLEMENT_CATEGORIES)
        .flatMap(cat => cat.products);
      setSupplements(allProducts);
    } finally {
      setLoading(false);
    }
  };

  // Group supplements by category for display
  const supplementsByCategory = Object.keys(SUPPLEMENT_CATEGORIES).reduce(
    (acc, categoryKey) => {
      acc[categoryKey] = supplements.filter(
        (sup) => (sup.category || categoryKey) === categoryKey
      );
      return acc;
    },
    {}
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p>Loading supplements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-2 bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Premium Supplements Shop
            </h1>
            <p className="text-gray-400 text-lg">
              Quality supplements for your fitness journey ({supplements.length} products)
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition"
          >
            <Plus className="w-5 h-5" />
            Add Supplement
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Display supplements by category */}
            {Object.entries(SUPPLEMENT_CATEGORIES).map(([categoryKey, category]) => {
              const categoryProducts = supplementsByCategory[categoryKey];
              
              return (
                <div key={categoryKey} className="mb-12">
                  {/* Category Header */}
                  <div className={`mb-6 p-4 rounded-lg bg-linear-to-r ${category.color} bg-opacity-20`}>
                    <h2 className="text-2xl font-bold text-white">{category.name}</h2>
                    <p className="text-gray-300">{categoryProducts.length} products</p>
                  </div>

                  {/* Products Grid */}
                  {categoryProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {categoryProducts.map((product) => {
                        const productId = product._id || product.id;
                        return (
                          <ProductCard
                            key={productId}
                            product={product}
                            onAddToCart={handleAddToCart}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 mb-8">
                      <p className="text-gray-400">
                        No supplements in {category.name} yet.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSidebar
                items={cartItems}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Supplement Modal */}
      <AddSupplementModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={fetchAllSupplements}
      />
    </div>
  );
}
