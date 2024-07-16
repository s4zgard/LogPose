import express from "express";
import { dropUsers, register, remove } from "../controllers/user.controller.js";
import { validateRegisterUser } from "../middlewares/validationMiddleware.js";
const router = express.Router();

// router.get("/drop", dropUsers);
router.route("/").post(validateRegisterUser, register);
router.route("/:userId").delete(remove);

export default router;
