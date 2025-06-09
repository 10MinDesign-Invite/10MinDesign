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
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("@repo/database");
exports.forgotPassword = (0, express_1.Router)();
exports.forgotPassword.put("/password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const confirmPassword = req.body.confirmPassword;
        const hashPassword = yield bcrypt_1.default.hash(confirmPassword, 10);
        const result = yield database_1.prisma.user.update({
            where: {
                email
            },
            data: {
                password: hashPassword.toString()
            }
        });
        if (result) {
            res.status(200).send("forgot success.");
        }
        else {
            res.status(404).send("forgot fail.");
        }
    }
    catch (error) {
        console.log(error);
    }
}));
