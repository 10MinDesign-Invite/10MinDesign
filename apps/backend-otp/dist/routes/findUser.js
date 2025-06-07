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
exports.findUser = void 0;
const database_1 = require("@repo/database");
const zod_input_validation_1 = require("@repo/zod-input-validation");
const express_1 = __importDefault(require("express"));
exports.findUser = (0, express_1.default)();
exports.findUser.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const parseData = zod_input_validation_1.verifyuser.safeParse({ email });
        if (!parseData.success) {
            res.send("email format not valid");
            return;
        }
        const user = yield database_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            res.status(404).send("user not found");
        }
        res.status(200).send(user);
    }
    catch (error) {
        console.log(error);
    }
}));
