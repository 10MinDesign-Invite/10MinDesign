"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpToken = verifyOtpToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyOtpToken(req, res, next) {
    try {
        const token = req.body.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized verify first then try" });
            return;
        }
        const validToken = jsonwebtoken_1.default.verify(token, process.env.jwt_OTP_SECRET);
        if (!validToken) {
            res.status(401).json({ message: "unothorized person to forgot password" });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: "internal server error" });
    }
}
