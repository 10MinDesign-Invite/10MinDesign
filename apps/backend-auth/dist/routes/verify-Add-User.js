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
exports.verify_Add_User = void 0;
const database_1 = require("@repo/database");
const zod_input_validation_1 = require("@repo/zod-input-validation");
const express_1 = require("express");
exports.verify_Add_User = (0, express_1.Router)();
exports.verify_Add_User.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const onlyEmail = req.body.onlyEmail;
    const parseData = zod_input_validation_1.verifyuser.safeParse({ email });
    if (!parseData.success) {
        res.send("email format not correct");
        return;
    }
    const user = yield database_1.prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        res.status(404).send("user not found");
        return;
    }
    if (onlyEmail == "select only email") {
        res.status(200).send(user.email);
    }
    else {
        res.status(200).send(user);
    }
}));
