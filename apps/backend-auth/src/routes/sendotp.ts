import { prisma } from "@repo/database";
import * as dotenv from "dotenv";
import Router from "express";
import { transporter } from "../utils/otpConfig";
dotenv.config();

export const OTP = Router();

OTP.post("/send-otp", async (req, res) => {
  try {
    const { email, otp, type } = req.body;

    if (!email || !otp) {
      res.status(400).json({ success: false, message: "Email is required" });
      return;
    }
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        accounts: {
          select: { providerId: true },
        },
      },
    });
    if (userExist && userExist?.accounts[0].providerId == "credential") {
      const emailSendData = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: "Your OTP Code for Password Reset",
        text: `Hi,

                You requested to reset your password. Please use the OTP below:

                OTP: ${otp}

                This OTP is valid for 5 min. If you did not request a password reset, you can ignore this email.

                — 10MinDesign
                `,

        html: `<!DOCTYPE html>
                        <html>
                        <head>
                        <meta charset="UTF-8" />
                        <title>OTP Email</title>
                        </head>
                                <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                                <table cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                    <td style="padding: 20px;">
                                        <table cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px;">
                                        <tr>
                                            <td style="padding: 30px;">
                                            <h2 style="color: #333333; text-align: center;">Reset Your Password</h2>
                                            <p style="font-size: 16px; color: #555555;">Hi there,</p>
                                            <p style="font-size: 16px; color: #555555;">
                                                You requested to reset your password. Please use the OTP below to proceed:
                                            </p>

                                            <div style="text-align: center; margin: 30px 0;">
                                                <span style="display: inline-block; background-color: #e0f7fa; color: #00796b; font-size: 24px; padding: 12px 24px; border-radius: 6px; font-weight: bold; letter-spacing: 4px;">
                                                ${otp}
                                                </span>
                                            </div>

                                            <p style="font-size: 14px; color: #999999;">
                                                This OTP is valid for <strong>1 hour</strong>. If you did not request a password reset, please ignore this message.
                                            </p>

                                            <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;" />

                                            <p style="text-align: center; font-size: 12px; color: #aaaaaa;">
                                                &copy; ${new Date().getFullYear()} 10MinDesign. All rights reserved.
                                            </p>
                                            </td>
                                        </tr>
                                        </table>
                                    </td>
                                    </tr>
                                </table>
                                </body>
                                </html>`,
      });

      if (emailSendData.accepted.length !== 0) {
        res.status(200).json({ success: true, message: "OTP sent to email" });
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
