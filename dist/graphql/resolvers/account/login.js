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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = __importDefault(require("../../../db"));
const login = (args) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(args)
    const { password, email } = args;
    const userDb = yield db_1.default.query("SELECT * FROM users WHERE email =$1", [
        email,
    ]);
    if (userDb.rows < 1) {
        throw new Error("Invalid Credentials");
    }
    let user = userDb.rows[0];
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    const pass = yield bcrypt_1.default.compare(password, user.password);
    if (pass && user) {
        const token = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_SECRET);
        return { user, token };
    }
    throw new Error("Invalid Credentials");
});
exports.default = login;
//# sourceMappingURL=login.js.map