import Router from "express";
import { generateOTP, transporter } from "../utils/otpConfig";
import { prisma } from "@repo/database"
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from 'dotenv';
dotenv.config();

export const OTP = Router();

OTP.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    const generatedOtp = generateOTP();
    try {
        const otp = jwt.sign({ otp:generatedOtp }, process.env.jwt_OTP_SECRET!,{expiresIn:"1h"});
        const userExist = await prisma.user.findUnique({
            where:{
                email
            },
            select:
            {
                email:true,
                googleId:true
            }
        })
    
        if(userExist && userExist.googleId == null){
            const emailSendData = await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "🔐 Your OTP Code - Reset Password Request",
                html: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 500px; margin: auto; border: 1px solid #eaeaea; border-radius: 10px; background-color: #f9f9f9;">
                            <h2 style="text-align: center; color: #333;">Reset Your Password</h2>
                            <p style="font-size: 16px; color: #555;">Hello,</p>
                            <p style="font-size: 16px; color: #555;">We received a request to reset your password. Please use the OTP below to complete the process:</p>
                            
                            <div style="margin: 30px 0; text-align: center;">
                            <span style="display: inline-block; background-color: #e0f7fa; color: #00796b; font-size: 24px; padding: 12px 24px; border-radius: 8px; letter-spacing: 4px;">
                                ${generatedOtp}
                            </span>
                            </div>
    
                            <p style="font-size: 14px; color: #999;">This OTP is valid for <strong>1 hour</strong>. If you did not request a password reset, you can safely ignore this email.</p>
                            
                            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
                            
                            <p style="text-align: center; font-size: 12px; color: #aaa;">
                            © ${new Date().getFullYear()} Your App Name. All rights reserved.
                            </p>
                        </div>
                        `,
            });
           if(emailSendData.accepted){
            await prisma.otpStore.upsert({
                where: { email: email },
                update: {
                  otp
                },
                create: {
                  email: email,
                  otp
                }
              });
              
           }
        }else{
            res.status(404).json({message:"user not exist"});
        }
    
       res.json({ success: true, message: "OTP sent to email" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

OTP.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        let validOTP = null;
        if (!email || !otp) {
            res.json({ error: "provide email and otp" })
        }
        // access otp and verify is correct
        const userExist = await prisma.user.findUnique({
            where:{
                email
            },
            select:
            {
                email:true,
                googleId:true
            }
        })
        if(userExist){
            const dbOTP = await prisma.otpStore.findFirst({
                where: {
                    email
                }
            })
        
            if (dbOTP) {
                validOTP = jwt.verify(dbOTP.otp, process.env.jwt_OTP_SECRET!) as JwtPayload
            }
        
            if (validOTP?.otp.toString() == otp) {
                // delete the otp after successfull verification
                await prisma.otpStore.delete({
                    where:{
                        email
                    }
                })
                res.json({ success: true, message: "OTP verified" });
            } else {
                res.status(400).json({ success: false, message: "Invalid OTP" });
            }
        }else{
            res.status(404).json({ success: false, message: "user not found" });
        }
    } catch (error) {
        console.log(error);
    }
});
