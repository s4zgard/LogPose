import "express-async-errors";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json(user);
};

export const getAppStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  const partTime = await Job.countDocuments({ jobType: "part-time" });
  const fullTime = await Job.countDocuments({ jobType: "full-time" });
  const internship = await Job.countDocuments({ jobType: "internship" });
  res
    .status(200)
    .json({ users, jobs, jobType: { partTime, fullTime, internship } });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  delete obj.password;
  await User.findByIdAndUpdate(req.user._id, obj);
  res.status(200).json({ message: "user updated" });
};
