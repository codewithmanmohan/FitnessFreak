import mongoose from "mongoose";

const coachSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: [
      {
        type: String,
      },
    ],
    experience: {
      type: Number,
      required: true, // in years
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
    hourlyRate: {
      type: Number,
      required: true,
    },
    availability: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    bio: {
      type: String,
      default: "",
    },
    clients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Coach", coachSchema);
