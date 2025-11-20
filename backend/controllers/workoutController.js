import Workout from "../models/Workout.js";

export const createWorkout = async (req, res) => {
  try {
    const {
      title,
      description,
      exercises,
      duration,
      caloriesBurned,
      intensity,
      location,
      notes,
    } = req.body;

    const workout = await Workout.create({
      userId: req.userId,
      title,
      description,
      exercises,
      duration,
      caloriesBurned,
      intensity,
      location,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Workout created successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: workouts.length,
      workouts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to access this workout" });
    }

    res.status(200).json({
      success: true,
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateWorkout = async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this workout" });
    }

    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Workout updated successfully",
      workout,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    if (workout.userId.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this workout" });
    }

    await Workout.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
