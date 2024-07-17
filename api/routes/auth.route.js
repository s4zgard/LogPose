import express from "express";
import {
  dropUsers,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegisterUser,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();

// router.get("/drop", dropUsers);
router.route("/").post(validateRegisterUser, register);
router.post("/login", validateLogin, login);
router.get("/logout", logout);

export default router;
