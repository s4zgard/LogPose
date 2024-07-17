import express from "express";
import {
  createJob,
  deleteJob,
  fetchJobs,
  getJobById,
  updateJob,
} from "../controllers/job.controller.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middlewares/validationMiddleware.js";
import { admin } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.route("/").get(fetchJobs).post(validateJobInput, createJob);
router
  .route("/:jobId")
  .get(validateIdParam, getJobById)
  .put(validateIdParam, validateJobInput, updateJob)
  .delete(validateIdParam, deleteJob);

export default router;
