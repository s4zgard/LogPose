import express from "express";
import {
  createJob,
  deleteJob,
  fetchJobs,
  getJobById,
  updateJob,
} from "../controllers/job.contoller.js";

const router = express.Router();

router.route("/").get(fetchJobs).post(createJob);
router.route("/:jobId").get(getJobById).put(updateJob).delete(deleteJob);
export default router;
