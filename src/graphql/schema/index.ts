import { buildSchema } from "graphql";
const schema = buildSchema(`
type User{
    id: ID!
    name: String!
    phone: String!
    email: String!
    password: String!
    type: String!
    balance: Int!
    currency: String!
    createdAt: String!
}
type UserResponse {
    user: User!
    token: String
}
type Query {
    users: [User!]!
}
type Mutation {
    createUser(name:String!,  
        phone: String!
        password: String!
        type: String!
        email: String!):UserResponse
}
schema {
    query: Query
    mutation:Mutation
}`);
export default schema;
