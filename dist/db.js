"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "user",
    database: "ecommerce",
    password: "password",
    port: 5432,
    host: "localhost",
});
exports.default = pool;
// import { Pool } from "pg";
// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   database: process.env.DATABASE,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
//   host: process.env.DATABASE_HOST,
// });
// export default pool;
//# sourceMappingURL=db.js.map