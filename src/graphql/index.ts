import createUser from "./resolvers/account/register";
import login from "./resolvers/account/login";
import getProducts from "./resolvers/product/getProducts";
import createProduct from "./resolvers/product/createProduct";

const root = { createUser, login, getProducts, createProduct };

export default root;
