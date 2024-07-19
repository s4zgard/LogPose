import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import jobRouter from "./routes/job.route.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import connectDB from "./utils/connectDB.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import { protect } from "./middlewares/authMiddleware.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
connectDB();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const port = process.env.PORT || 5000;

app.get("/api", (req, res) => res.send("api is running ...."));

app.use("/api/jobs", protect, jobRouter);
app.use("/api/users", protect, userRouter);
app.use("/api/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorMiddleware);

app.listen(port, () =>
  console.log("Server is running on port", port, `http://localhost:${port}`)
);
