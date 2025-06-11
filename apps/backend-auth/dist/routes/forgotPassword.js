"use strict";
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
exports.forgotPassword = void 0;
const database_1 = require("@repo/database");
const zod_input_validation_1 = require("@repo/zod-input-validation");
const express_1 = require("express");
const verifyOtpToken_1 = require("../middleware/verifyOtpToken");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.forgotPassword = (0, express_1.Router)();
exports.forgotPassword.put("/password", verifyOtpToken_1.verifyOtpToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, confirmPassword } = req.body;
        const validInput = zod_input_validation_1.forgotPasswordSchema.safeParse({ email, password, confirmPassword });
        if (!validInput.success) {
            res.status(400).send(validInput.error.errors[0].message);
            return;
        }
        const hashPassword = yield bcrypt_1.default.hash(confirmPassword, 10);
        if (!email || !password || !confirmPassword) {
            res.status(400).send("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).send("Passwords not match.");
            return;
        }
        if (!hashPassword) {
            console.log("failed to hash password");
            return;
        }
        const result = yield database_1.prisma.user.update({
            where: {
                email: email
            },
            data: {
                password: hashPassword
            },
        });
        if (result) {
            res.status(200).json({ success: true, message: "forgot success." });
        }
        else {
            res.status(404).json({ success: false, message: "forgot fail." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}));
