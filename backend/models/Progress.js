import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    weight: {
      type: Number,
      default: null,
    },
    bodyFat: {
      type: Number,
      default: null,
    },
    muscleMass: {
      type: Number,
      default: null,
    },
    measurements: {
      chest: Number,
      waist: Number,
      hips: Number,
      thigh: Number,
      bicep: Number,
    },
    photos: [
      {
        url: String,
        date: Date,
      },
    ],
    notes: {
      type: String,
      default: "",
    },
    bpmReading: {
      bpm: Number,
      date: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Progress", progressSchema);
