import express from "express"
import { OTP } from "./routes/sendotp"
import cors from "cors"
import * as dotenv from 'dotenv';
dotenv.config();
const app = express()
app.use(express.json())
app.use(cors({
    origin:`${process.env.FRONTEND_URL}`
}))
app.use("/auth",OTP);

app.listen(process.env.PORT);
