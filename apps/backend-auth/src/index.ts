import express from "express"
import { OTP } from "./routes/sendotp"
import cors from "cors"
import * as dotenv from 'dotenv';
import { verifyUser } from "./routes/findUser";
import { addUser } from "./routes/addUser";
import { forgotPassword } from "./routes/forgotPassword";
import cookieParser from "cookie-parser"
dotenv.config();
const app = express()

app.use(cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: ['GET', 'POST', 'HEAD', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());
app.use(cookieParser());



app.use("/auth",OTP);
app.use("/verify",verifyUser);
app.use("/add",addUser);
app.use("/forgot",forgotPassword);

app.listen(process.env.PORT || 8080);
