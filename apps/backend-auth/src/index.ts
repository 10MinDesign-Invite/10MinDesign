import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import express from "express";
import {auth, toNodeHandler} from "@repo/auth/auth"
import { OTP } from "./routes/sendotp";
import { getUsers } from "./routes/getUsers";
import job from "./config/cron";


dotenv.config();
const app = express();
app.use(cookieParser());

app.use(cors({
    origin:[`${process.env.FRONTEND_URL}`,process.env.CORN_JOB!],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.all('/api/auth/*spalt', toNodeHandler(auth));

app.use(express.json());
if(process.env.NODE_ENV == "production") job.start();

app.get("/api/health", (req,res)=>{
    res.status(200).json({status: "ok"});
});

app.use("/auth",OTP);
app.use("/get", getUsers);

app.listen(process.env.PORT ?? 8080);
