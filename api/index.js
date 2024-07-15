import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import jobRouter from "./routes/job.route.js";

dotenv.config();
const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

app.get("/api", (req, res) => res.send("api is running ...."));

app.use("/api/jobs", jobRouter);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wront";
  res.status(500).json({ success: false, statusCode, message });
});

app.listen(port, () =>
  console.log("Server is running on port", port, `http://localhost:${port}`)
);
