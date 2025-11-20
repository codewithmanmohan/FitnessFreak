import mongoose from "mongoose";

const supplementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Supplement name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    category: {
      type: String,
      enum: ["protein", "aminoAcids", "creatine", "preWorkout", "vitamins", "omega3"],
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    benefits: {
      type: String,
      required: [true, "Benefits are required"],
    },
    image: {
      type: String,
      default: "",
    },
    manufacturingDate: {
      type: Date,
      required: [true, "Manufacturing date is required"],
    },
    expiryDate: {
      type: Date,
      required: [true, "Expiry date is required"],
    },
    stock: {
      type: Number,
      default: 100,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplement", supplementSchema);
