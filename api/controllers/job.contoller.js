import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "UI/UX" },
  { id: nanoid(), company: "microsoft", position: "Cloud Engineer" },
  { id: nanoid(), company: "google", position: "Front-end engineer" },
  { id: nanoid(), company: "netflix", position: "Full-stack engineer" },
];

export const fetchJobs = async (req, res) => {
  res.status(200).json(jobs);
};

export const createJob = async (req, res) => {
  const { company, position } = req.body;
  const job = { id: nanoid(), company, position };
  jobs.push(job);

  res.status(200).json({ message: "Job created" });
};

export const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  jobs = jobs.filter((j) => j.id !== jobId);
  res.json({ message: "Job Deleted" });
};
