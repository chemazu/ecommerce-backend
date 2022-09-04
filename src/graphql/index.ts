import createUser from "./resolvers/account/register";
import login from "./resolvers/account/login";

const root = { createUser, login };

export default root;
