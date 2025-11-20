import Coach from "../models/Coach.js";
import User from "../models/User.js";

// Create a new coach
export const createCoach = async (req, res) => {
  try {
    let {
      name,
      email,
      phone,
      age,
      gender,
      specialty,
      experience,
      category,
      charges,
      hourlyRate,
      bio,
      responsibilities,
      certifications,
    } = req.body;

    console.log("Received coach data:", req.body);

    // Parse specialty if it's a JSON string or comma-separated
    if (typeof specialty === "string") {
      try {
        // Try JSON first
        specialty = JSON.parse(specialty);
      } catch (e) {
        // If not JSON, treat as comma-separated
        specialty = specialty
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      }
    }
    if (!Array.isArray(specialty)) {
      specialty = [specialty];
    }

    // Parse responsibilities if it's a JSON string or comma-separated
    if (typeof responsibilities === "string") {
      try {
        // Try JSON first
        responsibilities = JSON.parse(responsibilities);
      } catch (e) {
        // If not JSON, treat as comma-separated
        responsibilities = responsibilities
          .split(",")
          .map((r) => r.trim())
          .filter((r) => r.length > 0);
      }
    }
    if (!Array.isArray(responsibilities)) {
      responsibilities = [responsibilities];
    }

    // Avatar from local upload
    const profileImage = req.file ? `/uploads/avatars/${req.file.filename}` : null;

    // Validation
    if (!name || !email || !specialty || !experience || !age) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    // Check if coach already exists
    const existingCoach = await Coach.findOne({ email });
    if (existingCoach) {
      return res
        .status(400)
        .json({ message: "Coach with this email already exists" });
    }

    const coach = await Coach.create({
      name,
      email,
      phone,
      age: parseInt(age),
      gender,
      specialty: Array.isArray(specialty) ? specialty : [specialty],
      experience: parseInt(experience),
      category,
      charges,
      hourlyRate: parseInt(hourlyRate) || 0,
      bio,
      profileImage,
      responsibilities: Array.isArray(responsibilities) ? responsibilities : [responsibilities],
      certifications,
    });

    res.status(201).json({
      success: true,
      message: "Coach created successfully",
      coach,
    });
  } catch (error) {
    console.error("Coach creation error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error creating coach",
    });
  }
};

// Get all coaches
export const getAllCoaches = async (req, res) => {
  try {
    const { category, search } = req.query;

    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
      ];
    }

    const coaches = await Coach.find(query).sort({ rating: -1 });

    res.status(200).json({
      success: true,
      count: coaches.length,
      coaches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single coach
export const getCoach = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      success: true,
      coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update coach
export const updateCoach = async (req, res) => {
  try {
    // Add profileImage if uploaded
    if (req.file) {
      req.body.profileImage = `/uploads/avatars/${req.file.filename}`;
    }

    const coach = await Coach.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      success: true,
      message: "Coach updated successfully",
      coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete coach
export const deleteCoach = async (req, res) => {
  try {
    const coach = await Coach.findByIdAndDelete(req.params.id);

    if (!coach) {
      return res.status(404).json({ message: "Coach not found" });
    }

    res.status(200).json({
      success: true,
      message: "Coach deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
