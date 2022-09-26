"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = __importDefault(require("./resolvers/account/register"));
const login_1 = __importDefault(require("./resolvers/account/login"));
const getProducts_1 = __importDefault(require("./resolvers/product/getProducts"));
const createProduct_1 = __importDefault(require("./resolvers/product/createProduct"));
const root = { createUser: register_1.default, login: login_1.default, getProducts: getProducts_1.default, createProduct: createProduct_1.default };
exports.default = root;
//# sourceMappingURL=index.js.map