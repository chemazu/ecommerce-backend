import express from "express";
import root from "../src/graphql/index";
import schema from "./graphql/schema";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
const app = express();
const port = 8000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use(cors());
app.use(express.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
