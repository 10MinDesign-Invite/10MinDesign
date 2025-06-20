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
exports.healthRoute = void 0;
// routes/health.ts
const express_1 = require("express");
const database_1 = require("@repo/database"); // adjust this import
exports.healthRoute = (0, express_1.Router)();
exports.healthRoute.get("/check", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield database_1.prisma.user.findFirst({ select: { id: true } });
        if (result) {
            res.status(200).json({ status: "DB awake " });
        }
        else {
            res.status(404).json({ status: "DB sleep " });
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ status: "DB error" });
    }
}));
