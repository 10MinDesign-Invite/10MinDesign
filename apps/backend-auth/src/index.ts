import express from "express"
import { OTP } from "./routes/sendotp"
import cors from "cors"
import * as dotenv from 'dotenv';
import { findUser } from "./routes/findUser";
dotenv.config();


const app = express()
app.use(express.json())
app.use(cors({
    origin:`${process.env.FRONTEND_URL}`
}))
app.use("/auth",OTP);
app.use("/verify",findUser);

app.listen(process.env.PORT);
