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
exports.addUser = void 0;
const database_1 = require("@repo/database");
const express_1 = require("express");
exports.addUser = (0, express_1.Router)();
exports.addUser.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, image, id } = req.body;
        yield database_1.prisma.user.create({
            data: {
                name,
                email,
                image,
                googleId: id === null || id === void 0 ? void 0 : id.toString(),
            }
        });
    }
    catch (error) {
        console.log(error);
    }
}));
