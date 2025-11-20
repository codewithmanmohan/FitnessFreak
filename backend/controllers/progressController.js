import Progress from "../models/Progress.js";

export const createProgress = async (req, res) => {
  try {
    const { weight, bodyFat, muscleMass, measurements, notes, bpmReading } =
      req.body;

    const progress = await Progress.create({
      userId: req.userId,
      weight,
      bodyFat,
      muscleMass,
      measurements,
      notes,
      bpmReading,
    });

    res.status(201).json({
      success: true,
      message: "Progress recorded successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProgressRecords = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: progress.length,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getLatestProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ userId: req.userId }).sort({
      date: -1,
    });

    if (!progress) {
      return res.status(404).json({ message: "No progress records found" });
    }

    res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Progress updated successfully",
      progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);

    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }

    res.status(200).json({
      success: true,
      message: "Progress record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
