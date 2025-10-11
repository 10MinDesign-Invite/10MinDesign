import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import job from "./config/cron";
import { getUsers } from "./routes/getUsers";
import { handelUser } from "./routes/handelUser";
import { OTP } from "./routes/sendotp";

import * as arctic from "arctic";
import { handelGoogleLogin } from "./routes/handelGoogleLogin";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['https://www.10mindesigns.shop', process.env.CORN_JOB!],
    credentials: true,
  }),
);

if (process.env.NODE_ENV == "production") job.start();

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/otp", OTP);
app.use("/auth", handelUser);
app.use("/get", getUsers);
// app.use(handelGoogleLogin);

app.listen(process.env.PORT || 8080);
