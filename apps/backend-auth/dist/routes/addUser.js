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
exports.addUser = void 0;
const database_1 = require("@repo/database");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_input_validation_1 = require("@repo/zod-input-validation");
exports.addUser = (0, express_1.Router)();
exports.addUser.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, image, id } = req.body;
        const userExist = yield database_1.prisma.user.findUnique({ where: { email } });
        if (!(userExist === null || userExist === void 0 ? void 0 : userExist.password)) {
            const result = yield database_1.prisma.user.upsert({
                where: { email },
                update: {
                    name,
                    image,
                    googleId: id === null || id === void 0 ? void 0 : id.toString(),
                },
                create: {
                    name,
                    email,
                    image,
                    googleId: id === null || id === void 0 ? void 0 : id.toString(),
                },
            });
            if (result) {
                res.status(200).json({ id: result.id });
            }
            else {
                res.status(500).send("error from backend res..... EEEEEE");
            }
        }
        else {
            res.status(500).send("worng user from backend res..... EEEEEE");
        }
    }
    catch (error) {
        console.log(error);
    }
}));
exports.addUser.post("/signupuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    try {
        if (!email || !name || !password) {
            res
                .status(400)
                .json({ success: false, message: "please provide all values" });
            return;
        }
        const vaidInput = zod_input_validation_1.registerSchema.safeParse({ name, email, password });
        if (!vaidInput.success) {
            res
                .status(400)
                .json({ success: false, message: vaidInput.error.message });
            return;
        }
        const user = yield database_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (user) {
            res.status(400).json({ success: false, message: "user already exists" });
            return;
        }
        else {
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            if (hashPassword) {
                yield database_1.prisma.user.create({
                    data: {
                        email,
                        name,
                        password: hashPassword,
                    },
                });
                res.status(201).json({ success: true, message: "signup successfully" });
            }
            else {
                res.status(500).json({ success: false, message: "signup failed" });
            }
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error OR see your internet",
        });
    }
}));
