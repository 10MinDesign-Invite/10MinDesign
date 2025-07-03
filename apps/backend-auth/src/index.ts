import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from 'dotenv';
import express from "express";
import { addUser } from "./routes/addUser";
import { healthRoute } from "./routes/health";
import { OTP } from "./routes/sendotp";
import { verify_Add_User } from "./routes/verify-Add-User";
import { getUsers } from "./routes/getUsers";
dotenv.config();
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin:[process.env.FRONTEND_URL!,process.env.CORN_JOB!],
        credentials:true
    }
));

app.use("/auth",OTP);
app.use("/verify",verify_Add_User);
app.use("/add",addUser);
app.use("/health", healthRoute);
app.use("/get", getUsers);


app.listen(process.env.PORT || 8080);
