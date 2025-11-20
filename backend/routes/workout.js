import express from "express";
import * as workoutController from "../controllers/workoutController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", workoutController.createWorkout);
router.get("/", workoutController.getWorkouts);
router.get("/:id", workoutController.getWorkout);
router.put("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.deleteWorkout);

export default router;
