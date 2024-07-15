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

app.listen(port, () =>
  console.log("Server is running on port", port, `http://localhost:${port}`)
);
