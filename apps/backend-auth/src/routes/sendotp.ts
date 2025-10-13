import Router from "express";
import { generateOTP } from "../utils/otpConfig";
import { prisma } from "@repo/database";
import * as dotenv from "dotenv";
import bcrypt from "bcrypt";
import { forgotPasswordSchema } from "@repo/zod-input-validation";
import { resend } from "../config/resend-config";
import { emailHtml } from "../helpers/emailHtml";
dotenv.config();

export const OTP = Router();

OTP.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ success: false, message: "Email is required" });
    return;
  }
  const generatedOtp = generateOTP();
  try {
    const hashedOtp = await bcrypt.hash(generatedOtp, 10);
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        googleId: true,
      },
    });

    if (userExist && userExist.googleId == null) {
      const { data, error } = await resend.emails.send({
        from: "10MinDesign <noreply@api.10mindesigns.shop>",
        to: [`${email}`],
        subject: "sending or testing the email",
        html: `${emailHtml(email, generatedOtp)}`,
      });

      if (!error) {
        await prisma.otpStore.upsert({
          where: { email },
          update: {
            otp: hashedOtp,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
          create: {
            email,
            otp: hashedOtp,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
          },
        });

        res.json({ success: true, message: "OTP sent to email" });
        return;
      }
    } else {
      res.status(404).json({ message: "user not exist or invalid email" });
      return;
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

OTP.post("/verify-otp", async (req, res) => {
  const { email, otp, password, confirmPassword } = req.body;
  try {
    if (!email || !otp) {
      res.json({ error: "provide email and otp" });
      return;
    }
    const validInput = forgotPasswordSchema.safeParse({
      email,
      otp,
      password,
      confirmPassword,
    });
    if (!validInput.success) {
      res.status(500).json({ success: false, message: "not vaild input" });
      return;
    }
    // access otp and verify is correct
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        googleId: true,
      },
    });
    if (userExist) {
      const dbOTP = await prisma.otpStore.findFirst({
        where: {
          email,
        },
      });
      const now = new Date();
      const expireAt = new Date(dbOTP?.expiresAt!);
      if (expireAt < now) {
        res.status(400).json({ success: false, message: "OTP expired" });
        return;
      }
      if (dbOTP) {
        const parseOTP = await bcrypt.compare(otp, dbOTP.otp);
        if (parseOTP) {
          // delete the otp after successfull verification
          const deleteotp = await prisma.otpStore.delete({
            where: {
              email,
            },
          });
          if (deleteotp) {
            if (password === confirmPassword) {
              const hashPassword = await bcrypt.hash(
                validInput?.data?.confirmPassword!,
                10,
              );
              const resetPassword = await prisma.user.update({
                where: {
                  email,
                },
                data: {
                  password: hashPassword,
                },
              });
              if (resetPassword) {
                res.status(200).json({
                  success: true,
                  message: "password reset success",
                });
                return;
              } else {
                res.status(401).json({
                  success: false,
                  message: "password reset failed",
                });
                return;
              }
            } else {
              res.status(500).json({
                success: false,
                message: "both passwords not match",
              });
              return;
            }
          }
        } else {
          res.status(400).json({ success: false, message: "Invalid OTP" });
          return;
        }
      } else {
        res.status(404).json({
          success: false,
          message: "Otp not found or correct try new otp",
        });
        return;
      }
    } else {
      res.status(404).json({ success: false, message: "user not found" });
      return;
    }
  } catch (error) {
    console.log(error);
  }
});
