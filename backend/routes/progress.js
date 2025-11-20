import express from "express";
import * as progressController from "../controllers/progressController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", progressController.createProgress);
router.get("/", progressController.getProgressRecords);
router.get("/latest", progressController.getLatestProgress);
router.put("/:id", progressController.updateProgress);
router.delete("/:id", progressController.deleteProgress);

export default router;
