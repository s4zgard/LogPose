import { nanoid } from "nanoid";
import { errorHandler } from "../utils/errorHandler.js";

let jobs = [
  { id: nanoid(), company: "apple", position: "UI/UX" },
  { id: nanoid(), company: "microsoft", position: "Cloud Engineer" },
  { id: nanoid(), company: "google", position: "Front-end engineer" },
  { id: nanoid(), company: "netflix", position: "Full-stack engineer" },
];

export const fetchJobs = async (req, res) => {
  res.status(200).json(jobs);
};

export const getJobById = async (req, res, next) => {
  const job = jobs.find((j) => j.id === req.params.jobId);
  if (!job) {
    return next(errorHandler(404, "Not found"));
  }
  res.status(200).json(job);
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = { id: nanoid(), company, position };
  jobs.push(job);

  res.status(200).json({ message: "Job created" });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  const job = jobs.find((j) => j.id === req.params.jobId);
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }
  job.company = company;
  job.position = position;

  res.status(200).json({ message: "Job updated", job });
};

export const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  jobs = jobs.filter((j) => j.id !== jobId);
  res.json({ message: "Job Deleted" });
};
