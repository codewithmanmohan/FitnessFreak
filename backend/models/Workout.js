import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        weight: Number,
        duration: Number, // in minutes
        notes: String,
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
    duration: {
      type: Number,
      required: true, // in minutes
    },
    caloriesBurned: {
      type: Number,
      default: 0,
    },
    intensity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    location: {
      type: String,
      default: "gym",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Workout", workoutSchema);
