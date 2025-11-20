import express from "express";
import * as coachController from "../controllers/coachController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", coachController.getAllCoaches);
router.get("/:id", coachController.getCoach);

router.use(authMiddleware);

router.post("/", coachController.createCoachProfile);
router.get("/profile/me", coachController.getCoachProfile);
router.put("/", coachController.updateCoachProfile);

export default router;
