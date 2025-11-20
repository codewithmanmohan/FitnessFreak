import Feedback from "../models/Feedback.js";
import Coach from "../models/Coach.js";

export const createFeedback = async (req, res) => {
  try {
    const { targetId, targetType, rating, title, comment, isAnonymous } =
      req.body;

    const feedback = await Feedback.create({
      userId: req.userId,
      targetId,
      targetType,
      rating,
      title,
      comment,
      isAnonymous,
    });

    // Update coach rating if feedback is for a coach
    if (targetType === "coach") {
      const coach = await Coach.findById(targetId);
      if (coach) {
        const totalRating = coach.rating * coach.reviewCount + rating;
        coach.reviewCount += 1;
        coach.rating = totalRating / coach.reviewCount;
        await coach.save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const { targetType, targetId } = req.query;

    let filter = { status: "approved" };
    if (targetType) filter.targetType = targetType;
    if (targetId) filter.targetId = targetId;

    const feedback = await Feedback.find(filter)
      .populate("userId", "firstName lastName profileImage")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const approveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.status(200).json({
      success: true,
      message: "Feedback approved",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
