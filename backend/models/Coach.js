import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Coach name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Coach email is required"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: "",
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "male",
    },
    specialty: [
      {
        type: String,
        required: true,
      },
    ],
    experience: {
      type: Number,
      required: true, // in years
    },
    category: {
      type: String,
      enum: ["premium", "standard", "free"],
      default: "standard",
    },
    charges: {
      type: String,
      enum: ["high", "medium-high", "medium", "affordable", "free"],
      default: "affordable",
    },
    hourlyRate: {
      type: Number,
      default: 0,
    },
    certifications: [
      {
        name: String,
        issuer: String,
        issueDate: Date,
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      default: "",
    },
    profileImage: {
      type: String,
      default: "",
    },
    responsibilities: [
      {
        type: String,
      },
    ],
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isApproved: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Coach", coachSchema);
