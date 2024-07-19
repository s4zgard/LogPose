import "express-async-errors";
import mongoose from "mongoose";
import Job from "../models/job.model.js";
import day from "dayjs";

export const fetchJobs = async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user._id });
  res.status(200).json({ jobs });
};

export const getJobById = async (req, res, next) => {
  const job = await Job.findById(req.params.jobId);
  res.status(200).json({ job });
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

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user._id) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");
      return { date, count };
    })
    .reverse();

  res.status(200).json({ defaultStats, monthlyApplications });
};
