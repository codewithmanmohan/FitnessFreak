import express from "express";
import * as supplementController from "../controllers/supplementController.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", supplementController.getAllSupplements);
router.get("/:id", supplementController.getSupplement);

router.use(authMiddleware);
router.use(adminMiddleware);

router.post("/", supplementController.createSupplement);
router.put("/:id", supplementController.updateSupplement);
router.delete("/:id", supplementController.deleteSupplement);

export default router;
