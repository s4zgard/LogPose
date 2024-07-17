import "express-async-errors";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";
import { UnauthenticatedError } from "../utils/customErrors.js";
import { generateJWT } from "../utils/generateToken.js";

export const dropUsers = async (req, res) => {
  await User.deleteMany({});
  res.send("Dropped");
};

export const register = async (req, res) => {
  const isFirst = (await User.countDocuments()) === 0;
  req.body.role = isFirst ? "admin" : "user";

  req.body.password = await hashPassword(req.body.password);

  const user = await User.create(req.body);

  res.status(200).json({ user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const isValid = user && bcrypt.compareSync(password, user.password);

  if (!isValid) throw new UnauthenticatedError("Invalid credentials.");

  generateJWT(res, { userId: user._id, role: user.role });

  const { password: no, ...rest } = user._doc;

  res.status(200).json({ message: "User logged-in", user: rest });
};

export const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "User logged out." });
};

export const remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ message: "User deleted" });
};
