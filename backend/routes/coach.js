import express from "express";
import * as coachController from "../controllers/coachController.js";
import { authMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public routes
router.get("/", coachController.getAllCoaches);
router.get("/:id", coachController.getCoach);

// Protected routes - handle multer errors gracefully
router.post("/", (req, res, next) => {
  upload.single("avatar")(req, res, function(err) {
    if (err) {
      console.error("Multer error:", err);
      // Don't fail on multer errors, just skip the file
      req.file = undefined;
    }
    next();
  });
}, coachController.createCoach);

router.put("/:id", (req, res, next) => {
  upload.single("avatar")(req, res, function(err) {
    if (err) {
      console.error("Multer error:", err);
      req.file = undefined;
    }
    next();
  });
}, coachController.updateCoach);

router.delete("/:id", coachController.deleteCoach);

export default router;
