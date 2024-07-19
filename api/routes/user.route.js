import express from "express";
import {
  getAppStats,
  getCurrentUser,
  updateUser,
} from "../controllers/user.controller.js";
import { admin } from "../middlewares/authMiddleware.js";
import { validateUpdateUser } from "../middlewares/validationMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";
const router = express.Router();

router.get("/current-user", getCurrentUser);
router.put(
  "/update-user",
  upload.single("avatar"),
  validateUpdateUser,
  updateUser
);
router.get("/admin/stats", admin, getAppStats);

export default router;
