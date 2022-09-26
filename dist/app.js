"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const index_1 = __importDefault(require("../src/graphql/index"));
const schema_1 = __importDefault(require("./graphql/schema"));
const express_graphql_1 = require("express-graphql");
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8000;
(0, dotenv_1.config)();
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
// pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//     if (error) {
//       throw error
//     }
// console.log(results.rows)
//   })
db_1.default.connect((err) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_1.default,
    rootValue: index_1.default,
    graphiql: true,
}));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map