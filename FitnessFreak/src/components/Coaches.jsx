import React, { useState, useEffect } from "react";
import {
  Star,
  Plus,
  Trash2,
  X,
  Search,
} from "lucide-react";
import { coachesAPI } from "../utils/api";

export default function Coaches() {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "male",
    specialty: "",
    experience: "",
    category: "standard",
    charges: "affordable",
    hourlyRate: "",
    bio: "",
    responsibilities: "",
    avatar: null,
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  // Fetch coaches
  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const response = await coachesAPI.getAll();
      setCoaches(response.coaches || []);
      setError("");
    } catch (err) {
      setError(err.message);
      console.error("Error fetching coaches:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "avatar" && files) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("age", formData.age);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("charges", formData.charges);
      formDataToSend.append("hourlyRate", formData.hourlyRate || "0");
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("specialty", formData.specialty); // Send as string, backend will parse
      formDataToSend.append("responsibilities", formData.responsibilities); // Send as string
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }

      console.log("Sending form data...");
      
      // Create coach with FormData
      const response = await fetch("http://localhost:5000/api/coaches", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to add coach");
      }

      fetchCoaches();
      setShowModal(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "male",
        specialty: "",
        experience: "",
        category: "standard",
        charges: "affordable",
        hourlyRate: "",
        bio: "",
        responsibilities: "",
        avatar: null,
      });
      setAvatarPreview("");
      alert("Coach added successfully!");
    } catch (err) {
      console.error("Error details:", err);
      alert("Error adding coach: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      try {
        await coachesAPI.delete(id);
        fetchCoaches();
        alert("Coach deleted successfully!");
      } catch (err) {
        alert("Error deleting coach: " + err.message);
      }
    }
  };

  const filteredCoaches = coaches.filter((coach) => {
    const matchesCategory =
      categoryFilter === "all" || coach.category === categoryFilter;
    const matchesSearch =
      coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialty.some((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "premium":
        return "from-purple-600 to-pink-600";
      case "standard":
        return "from-blue-600 to-cyan-600";
      case "free":
        return "from-green-600 to-emerald-600";
      default:
        return "from-gray-600 to-slate-600";
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case "premium":
        return "bg-purple-600/20 text-purple-400 border-purple-500/50";
      case "standard":
        return "bg-blue-600/20 text-blue-400 border-blue-500/50";
      case "free":
        return "bg-green-600/20 text-green-400 border-green-500/50";
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-500/50";
    }
  };

  const getChargesDisplay = (charges) => {
    const chargesMap = {
      high: "$$$",
      "medium-high": "$$",
      medium: "$$",
      affordable: "$",
      free: "Free",
    };
    return chargesMap[charges] || charges;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p>Loading coaches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Our Expert Coaches</h1>
            <p className="text-gray-400">
              Learn from {coaches.length} qualified fitness professionals
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Coach
          </button>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search coaches by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f172a] text-white placeholder-gray-500 rounded-lg pl-12 pr-4 py-3 border border-slate-700 focus:border-cyan-500 focus:outline-none transition"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { value: "all", label: "All Coaches" },
              { value: "premium", label: "Premium" },
              { value: "standard", label: "Standard" },
              { value: "free", label: "Free" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setCategoryFilter(value)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition font-semibold ${
                  categoryFilter === value
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-600/20 border border-red-500 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Coaches Grid */}
        {filteredCoaches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchTerm || categoryFilter !== "all"
                ? "No coaches found matching your criteria"
                : "No coaches available"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCoaches.map((coach) => (
              <div
                key={coach._id}
                className="bg-[#0f172a] rounded-lg overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition group"
              >
                {/* Header with Category Badge */}
                <div
                  className={`h-24 bg-gradient-to-r ${getCategoryColor(
                    coach.category
                  )} relative`}
                >
                  {/* Avatar */}
                  {coach.profileImage && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8">
                      <img
                        src={`http://localhost:5000${coach.profileImage}`}
                        alt={coach.name}
                        className="w-16 h-16 rounded-full border-4 border-[#0f172a] object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/64?text=Avatar";
                        }}
                      />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryBadge(
                        coach.category
                      )}`}
                    >
                      {coach.category.charAt(0).toUpperCase() +
                        coach.category.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-12">
                  {/* Name and Title */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-bold mb-1">{coach.name}</h2>
                      <p className="text-sm text-gray-400">{coach.gender}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(coach._id)}
                      className="p-2 hover:bg-red-600/20 rounded-lg transition text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Specialty */}
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-2">SPECIALTY</p>
                    <div className="flex flex-wrap gap-2">
                      {coach.specialty && coach.specialty.map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-slate-800 text-cyan-400 text-xs rounded-full"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {/* Experience */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">
                        {coach.experience}
                      </div>
                      <p className="text-xs text-gray-400">Years</p>
                    </div>

                    {/* Age */}
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">
                        {coach.age}
                      </div>
                      <p className="text-xs text-gray-400">Age</p>
                    </div>

                    {/* Rating */}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-lg font-bold text-yellow-400">
                          {coach.rating || 0}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Rating</p>
                    </div>
                  </div>

                  {/* Bio */}
                  {coach.bio && (
                    <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                      {coach.bio}
                    </p>
                  )}

                  {/* Charges */}
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-gray-400 text-sm">Charges:</p>
                    <p className="text-lg font-bold text-emerald-400">
                      {getChargesDisplay(coach.charges)}
                    </p>
                  </div>

                  {/* Responsibilities */}
                  {coach.responsibilities && coach.responsibilities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-400 mb-2">RESPONSIBILITIES</p>
                      <ul className="text-xs text-gray-300 space-y-1">
                        {coach.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400">✓</span>
                            {resp}
                          </li>
                        ))}
                        {coach.responsibilities.length > 3 && (
                          <li className="text-gray-500">
                            +{coach.responsibilities.length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Contact */}
                  <div className="flex gap-2 pt-4 border-t border-slate-700">
                    <button className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition text-sm font-semibold">
                      Message
                    </button>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/30 rounded-lg transition text-sm font-semibold">
                      Book
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Coach Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f172a] rounded-lg border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-slate-700 bg-[#0f172a]">
              <h2 className="text-2xl font-bold">Add New Coach</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-700 rounded-lg transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Coach name"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Email"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                    placeholder="Age"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Experience (Years) *
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    placeholder="Years"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                {/* Specialty */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Specialty *
                  </label>
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Strength training, Weight loss"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  >
                    <option value="premium">Premium</option>
                    <option value="standard">Standard</option>
                    <option value="free">Free</option>
                  </select>
                </div>

                {/* Charges */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Charges
                  </label>
                  <select
                    name="charges"
                    value={formData.charges}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  >
                    <option value="high">High ($$$)</option>
                    <option value="medium-high">Medium-High ($$)</option>
                    <option value="medium">Medium ($$)</option>
                    <option value="affordable">Affordable ($)</option>
                    <option value="free">Free</option>
                  </select>
                </div>

                {/* Hourly Rate */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Hourly Rate ($)
                  </label>
                  <input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleInputChange}
                    placeholder="0"
                    className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Avatar (Profile Picture)
                </label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      name="avatar"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-cyan-600 file:text-white file:cursor-pointer"
                    />
                  </div>
                  {avatarPreview && (
                    <div className="flex items-center justify-center">
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="w-16 h-16 rounded-lg object-cover border-2 border-cyan-500"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Supported formats: JPG, PNG, GIF (Max 5MB)
                </p>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-semibold mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Coach bio/description"
                  rows="3"
                  className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition resize-none"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Responsibilities (comma-separated)
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  placeholder="e.g., Personalized plans, Weekly reviews, Nutrition guidance"
                  rows="3"
                  className="w-full bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-600 focus:border-cyan-500 focus:outline-none transition resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/50 rounded-lg transition font-semibold"
                >
                  Add Coach
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
