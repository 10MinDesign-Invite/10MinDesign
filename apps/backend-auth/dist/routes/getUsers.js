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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const express_1 = require("express");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const database_1 = require("@repo/database");
exports.getUsers = (0, express_1.Router)();
exports.getUsers.post("/users", AuthMiddleware_1.AuthMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = req.body.data;
        if (data === "GET_ALL_USERS") {
            const Users = yield database_1.prisma.user.findMany({ select: { email: true, name: true, id: true, image: true, googleId: true } });
            if (Users.length > 0 && Users) {
                res.status(200).send(Users);
                return;
            }
            else {
                res.status(404).json({ success: false, message: "no data" });
                return;
            }
        }
        else if (data === "GET_TOTAL_USERS") {
            const UsersIds = yield database_1.prisma.user.findMany({ select: { id: true } });
            if (UsersIds.length > 0 && UsersIds) {
                res.status(200).send(UsersIds);
                return;
            }
            else {
                res.status(404).json({ success: false, message: "no data" });
                return;
            }
        }
        else if (data === "GET_TOTAL_GOOGLE_AND_GMAIL_USERS") {
            const GoogleIds = yield database_1.prisma.user.findMany({ select: { googleId: true } });
            if (GoogleIds.length > 0 && GoogleIds) {
                res.status(200).send(GoogleIds);
                return;
            }
            else {
                res.status(404).json({ success: false, message: "no data" });
                return;
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}));
