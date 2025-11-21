import express from "express";
import * as supplementController from "../controllers/supplementController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", supplementController.getAllSupplements);
router.get("/:id", supplementController.getSupplement);

router.use(authMiddleware);
router.use(adminMiddleware);

// With file upload
router.post("/", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "File upload error",
      });
    }
    next();
  });
}, supplementController.createSupplement);

router.put("/:id", (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message || "File upload error",
      });
    }
    next();
  });
}, supplementController.updateSupplement);

router.delete("/:id", supplementController.deleteSupplement);

export default router;
