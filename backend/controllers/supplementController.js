import Supplement from "../models/Supplement.js";

export const getAllSupplements = async (req, res) => {
  try {
    const { category, search } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const supplements = await Supplement.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: supplements.length,
      supplements,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSupplement = async (req, res) => {
  try {
    const supplement = await Supplement.findById(req.params.id);

    if (!supplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }

    res.status(200).json({
      success: true,
      supplement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createSupplement = async (req, res) => {
  try {
    const supplement = await Supplement.create(req.body);

    res.status(201).json({
      success: true,
      message: "Supplement created successfully",
      supplement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSupplement = async (req, res) => {
  try {
    const supplement = await Supplement.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!supplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }

    res.status(200).json({
      success: true,
      message: "Supplement updated successfully",
      supplement,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSupplement = async (req, res) => {
  try {
    const supplement = await Supplement.findByIdAndDelete(req.params.id);

    if (!supplement) {
      return res.status(404).json({ message: "Supplement not found" });
    }

    res.status(200).json({
      success: true,
      message: "Supplement deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
