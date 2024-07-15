import express from "express";
import {
  createJob,
  deleteJob,
  fetchJobs,
} from "../controllers/job.contoller.js";

const router = express.Router();

router.route("/").get(fetchJobs).post(createJob);
router.route("/:jobId").delete(deleteJob);
export default router;
