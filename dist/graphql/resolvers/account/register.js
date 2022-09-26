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
const joi_1 = __importDefault(require("joi"));
const db_1 = __importDefault(require("../../../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        first_name: joi_1.default.string().required(),
        last_name: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        email: joi_1.default.string().required(),
        role: joi_1.default.string().required(),
    });
    const { error } = schema.validate(args);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const { first_name, last_name, phone, email, role, password } = args;
    let created_at = new Date();
    let encryptedPassword = yield bcrypt_1.default.hash(password, 10);
    const dbUser = yield db_1.default.query("SELECT * FROM users WHERE email =$1", [
        email,
    ]);
    if (dbUser.rows.length > 0) {
        throw new Error("User already exists");
    }
    return db_1.default
        .query("INSERT INTO users (first_name,last_name,phone,email,role,created_at,password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *", [first_name, last_name, phone, email, role, created_at, encryptedPassword])
        .then((res) => {
        let token = jsonwebtoken_1.default.sign({ email: res.rows[0].email }, process.env.JWT_SECRET);
        return { user: res.rows[0], token };
    })
        .catch((error) => {
        throw new Error(error);
    });
});
exports.default = createUser;
//# sourceMappingURL=register.js.map