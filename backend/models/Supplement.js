import mongoose from "mongoose";

const supplementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "protein",
        "vitamin",
        "mineral",
        "amino_acid",
        "creatine",
        "bcaa",
        "pre_workout",
        "other",
      ],
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    servingSize: {
      type: String,
      required: true,
    },
    servingsPerContainer: {
      type: Number,
      default: null,
    },
    benefits: [String],
    ingredients: [String],
    dosage: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplement", supplementSchema);
