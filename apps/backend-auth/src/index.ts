import express from "express"
import { OTP } from "./routes/sendotp"
import cors from "cors"
import * as dotenv from 'dotenv';
import { verify_Add_User } from "./routes/verify-Add-User";
import { addUser } from "./routes/addUser";
import cookieParser from "cookie-parser"
dotenv.config();
const app = express()

app.use(cors({origin:[process.env.FRONTEND_URL!,process.env.CORN_JOB!]}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth",OTP);
app.use("/verify",verify_Add_User);
app.use("/add",addUser);

app.listen(process.env.PORT || 8080);
