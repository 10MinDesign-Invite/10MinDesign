"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const express_1 = __importDefault(require("express"));
const otpConfig_1 = require("../utils/otpConfig");
const database_1 = require("@repo/database");
const dotenv = __importStar(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_input_validation_1 = require("@repo/zod-input-validation");
dotenv.config();
exports.OTP = (0, express_1.default)();
exports.OTP.post("/send-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ success: false, message: "Email is required" });
        return;
    }
    const generatedOtp = (0, otpConfig_1.generateOTP)();
    try {
        const hashedOtp = yield bcrypt_1.default.hash(generatedOtp, 10);
        const userExist = yield database_1.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                email: true,
                googleId: true,
            },
        });
        if (userExist && userExist.googleId == null) {
            const emailSendData = yield otpConfig_1.transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email,
                subject: "Your OTP Code for Password Reset",
                text: `Hi,

                You requested to reset your password. Please use the OTP below:

                OTP: ${generatedOtp}

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
                                                ${generatedOtp}
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
                yield database_1.prisma.otpStore.upsert({
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
        }
        else {
            res.status(404).json({ message: "user not exist or invalid email" });
            return;
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
}));
exports.OTP.post("/verify-otp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, otp, password, confirmPassword } = req.body;
    try {
        if (!email || !otp) {
            res.json({ error: "provide email and otp" });
            return;
        }
        const validInput = zod_input_validation_1.forgotPasswordSchema.safeParse({
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
        const userExist = yield database_1.prisma.user.findUnique({
            where: {
                email,
            },
            select: {
                email: true,
                googleId: true,
            },
        });
        if (userExist) {
            const dbOTP = yield database_1.prisma.otpStore.findFirst({
                where: {
                    email,
                },
            });
            const now = new Date();
            const expireAt = new Date(dbOTP === null || dbOTP === void 0 ? void 0 : dbOTP.expiresAt);
            if (expireAt < now) {
                res.status(400).json({ success: false, message: "OTP expired" });
                return;
            }
            if (dbOTP) {
                const parseOTP = yield bcrypt_1.default.compare(otp, dbOTP.otp);
                if (parseOTP) {
                    // delete the otp after successfull verification
                    const deleteotp = yield database_1.prisma.otpStore.delete({
                        where: {
                            email,
                        },
                    });
                    if (deleteotp) {
                        if (password === confirmPassword) {
                            const hashPassword = yield bcrypt_1.default.hash((_a = validInput === null || validInput === void 0 ? void 0 : validInput.data) === null || _a === void 0 ? void 0 : _a.confirmPassword, 10);
                            const resetPassword = yield database_1.prisma.user.update({
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
                            }
                            else {
                                res.status(401).json({
                                    success: false,
                                    message: "password reset failed",
                                });
                                return;
                            }
                        }
                        else {
                            res.status(500).json({
                                success: false,
                                message: "both passwords not match",
                            });
                            return;
                        }
                    }
                }
                else {
                    res.status(400).json({ success: false, message: "Invalid OTP" });
                    return;
                }
            }
            else {
                res.status(404).json({
                    success: false,
                    message: "Otp not found or correct try new otp",
                });
                return;
            }
        }
        else {
            res.status(404).json({ success: false, message: "user not found" });
            return;
        }
    }
    catch (error) {
        console.log(error);
    }
}));
