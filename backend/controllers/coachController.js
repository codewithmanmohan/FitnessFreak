import Coach from "../models/Coach.js";
import User from "../models/User.js";

export const createCoachProfile = async (req, res) => {
  try {
    const {
      specialization,
      experience,
      certifications,
      hourlyRate,
      availability,
      bio,
    } = req.body;

    // Check if coach profile already exists
    const existingCoach = await Coach.findOne({ userId: req.userId });
    if (existingCoach) {
      return res.status(400).json({ message: "Coach profile already exists" });
    }

    const coach = await Coach.create({
      userId: req.userId,
      specialization,
      experience,
      certifications,
      hourlyRate,
      availability,
      bio,
    });

    // Update user role
    await User.findByIdAndUpdate(req.userId, { role: "coach" });

    res.status(201).json({
      success: true,
      message: "Coach profile created successfully",
      coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCoaches = async (req, res) => {
  try {
    const coaches = await Coach.find({ isApproved: true })
      .populate("userId", "firstName lastName email phone profileImage bio")
      .sort({ rating: -1 });

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

export const getCoach = async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id).populate(
      "userId",
      "firstName lastName email phone profileImage bio"
    );

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

export const updateCoachProfile = async (req, res) => {
  try {
    const coach = await Coach.findOneAndUpdate(
      { userId: req.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!coach) {
      return res.status(404).json({ message: "Coach profile not found" });
    }

    res.status(200).json({
      success: true,
      message: "Coach profile updated successfully",
      coach,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCoachProfile = async (req, res) => {
  try {
    const coach = await Coach.findOne({ userId: req.userId }).populate(
      "userId",
      "firstName lastName email phone profileImage bio"
    );

    if (!coach) {
      return res.status(404).json({ message: "Coach profile not found" });
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
