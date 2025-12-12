import cors from "cors";
import express from "express";
import job from "./config/cron.js";
import { addUser } from "./routes/addUser.js";
import { getUsers } from "./routes/getUsers.js";
import { handelTemplate } from "./routes/handelTemplate.js";
import { OTP } from "./routes/sendotp.js";
import { verify_Add_User } from "./routes/verify-Add-User.js";
import { handelWedding } from "./routes/handelWedding.js";
import cookieParser from "cookie-parser";
import { FRONTEND_URL, NODE_ENV, PORT } from "./env-config.js";


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [FRONTEND_URL!, "http://web:3000"],
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

app.use("/wedding", handelWedding);

app.listen(PORT || 8080, () =>
  console.log(`Backend Auth Service running on port ${PORT || 8080}`),
);
