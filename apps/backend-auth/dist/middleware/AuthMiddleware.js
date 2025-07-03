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
exports.AuthMiddleware = AuthMiddleware;
const jwt_1 = require("@auth/core/jwt");
function AuthMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const token = req.headers.authorization?.split(" ")[1];
            const token = req.cookies[`${process.env.NODE_ENV == 'development' ? 'authjs.session-token' : '__Secure-authjs.session-token'}`];
            const decoded = yield (0, jwt_1.decode)({
                token: token,
                salt: `${process.env.NODE_ENV === "development" ? process.env.DEV_SALT : process.env.PROD_SALT}`,
                secret: process.env.AUTH_SECRET
            });
            if (!token) {
                res.send("unauthorized user");
                return;
            }
            console.log(token, "000000000000000000000000000000000000000000");
            res.send([token]);
            // next();
        }
        catch (error) {
            console.log(error);
            res.send("Server Error");
        }
    });
}
