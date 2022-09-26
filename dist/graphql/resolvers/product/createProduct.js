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
const db_1 = __importDefault(require("../../../db"));
const joi_1 = __importDefault(require("joi"));
const createProduct = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const schema = joi_1.default.object({
        productname: joi_1.default.string().required(),
        productsku: joi_1.default.string().required(),
        productprice: joi_1.default.number().required(),
        productshortdesc: joi_1.default.string().required(),
        productlongdesc: joi_1.default.string().required(),
    });
    const { error } = schema.validate(args);
    if (error) {
        throw new Error(error.details[0].message);
    }
    const { productname, productsku, productprice, productshortdesc, productlongdesc, } = args;
    let created_at = new Date();
    return db_1.default
        .query("INSERT INTO products ( productname, productsku, productprice, productshortdesc,productlongdesc,created_at)VALUES ($1,$2,$3,$4,$5,$6) RETURNING *", [
        productname,
        productsku,
        productprice,
        productshortdesc,
        productlongdesc,
        created_at,
    ])
        .then((res) => {
        return res.rows[0];
    });
});
exports.default = createProduct;
//# sourceMappingURL=createProduct.js.map