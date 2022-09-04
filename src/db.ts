import { Pool } from "pg";
const pool = new Pool({
  user: "user",
  database: "ecommerce",
  password: "password",
  port: 5432,
  host: "localhost",
});

export default pool;
// import { Pool } from "pg";
// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   database: process.env.DATABASE,
//   password: process.env.DATABASE_PASSWORD,
//   port: process.env.DATABASE_PORT,
//   host: process.env.DATABASE_HOST,
// });

// export default pool;
