import "express-async-errors";
import Job from "../models/job.model.js";

export const fetchJobs = async (req, res, next) => {
  const allJobs = await Job.find({});
  res.status(200).json(allJobs);
};

export const getJobById = async (req, res, next) => {
  const job = await Job.findById(req.params.jobId);
  res.status(200).json(job);
};

export const createJob = async (req, res, next) => {
  req.body.createdBy = req.user._id;
  const job = await Job.create(req.body);

  res.status(200).json({ job });
};

export const updateJob = async (req, res, next) => {
  const { jobId } = req.params;
  const job = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

  res.status(200).json({ message: "Job updated", job });
};

export const deleteJob = async (req, res, next) => {
  await Job.findByIdAndDelete(req.params.jobId);

  res.json({ message: "Job Deleted" });
};
