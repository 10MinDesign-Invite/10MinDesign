import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import express from "express";
import {auth, toNodeHandler} from "@repo/auth/auth"
// import { addUser } from "./routes/addUser";
import { OTP } from "./routes/sendotp";
// import { verify_Add_User } from "./routes/verify-Add-User";
// import { getUsers } from "./routes/getUsers";
import job from "./config/cron";


dotenv.config();
const app = express();
app.use(cookieParser());

app.use(cors({
    origin:[`http://localhost:3000`,process.env.CORN_JOB!],
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
// app.use("/verify",verify_Add_User);
// app.use("/add",addUser);
// app.use("/get", getUsers);

app.listen(process.env.PORT || 8080);
