import express from "express";
import * as feedbackController from "../controllers/feedbackController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", feedbackController.getFeedback);

router.use(authMiddleware);

router.post("/", feedbackController.createFeedback);
router.get("/user/me", feedbackController.getUserFeedback);

router.use(adminMiddleware);
router.put("/:id/approve", feedbackController.approveFeedback);

export default router;
