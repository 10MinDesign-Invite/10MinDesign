import express from "express"
import { OTP } from "./routes/sendotp"
import cors from "cors"
import * as dotenv from 'dotenv';
import { verifyUser } from "./routes/findUser";
import { addUser } from "./routes/addUser";
import { forgotPassword } from "./routes/forgotPassword";
dotenv.config();
const app = express()
app.use(express.json())
app.use(cors({
    origin:`${process.env.FRONTEND_URL}`
}))
app.use("/auth",OTP);
app.use("/verify",verifyUser);
app.use("/add",addUser);
app.use("/forgot",forgotPassword);

app.listen(process.env.PORT || 8080);
