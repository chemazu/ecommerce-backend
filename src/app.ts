import express from "express";
import { config } from "dotenv";
import root from "../src/graphql/index";
import schema from "./graphql/schema";
import { graphqlHTTP } from "express-graphql";
import pool from "./db";
import cors from "cors";
const app = express();
const port = 8000;
config()
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
// console.log(results.rows)
//   })
  pool.connect((err) => {
    if (err) {
      return console.error("Error acquiring client", err.stack);
    }})
app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
