import "express-async-errors";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { hashPassword } from "../utils/hashPassword.js";

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

export const remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ message: "User deleted" });
};
