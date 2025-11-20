import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import job from "./config/cron";
import { addUser } from "./routes/addUser";
import { getUsers } from "./routes/getUsers";
import { handelTemplate } from "./routes/handelTemplate";
import { OTP } from "./routes/sendotp";
import { verify_Add_User } from "./routes/verify-Add-User";
import { FRONTEND_URL, NODE_ENV, PORT } from "./env-config";
import { handelWedding } from "./routes/handelWedding";


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [FRONTEND_URL!],
    credentials: true,
  }),
);

if (NODE_ENV == "production") job.start();

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.use("/auth", OTP);
app.use("/verify", verify_Add_User);
app.use("/add", addUser);
app.use("/template", handelTemplate);
app.use("/get", getUsers);

// wedding section

app.use("/wedding",handelWedding)


app.listen(PORT || 8080);
