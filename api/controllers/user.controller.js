import "express-async-errors";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json({ user });
};

export const getAppStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  // const partTime = await Job.countDocuments({ jobType: "part-time" });
  // const fullTime = await Job.countDocuments({ jobType: "full-time" });
  // const internship = await Job.countDocuments({ jobType: "internship" });
  res.status(200).json({ users, jobs });
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  if (req.file) {
    const res = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    newUser.avatar = res.secure_url;
    newUser.avatarPublic = res.public_id;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, newUser);
  if (req.file && newUser.avatarPublic) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublic);
  }

  res.status(200).json({ message: "user updated" });
};
