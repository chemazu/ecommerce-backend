import { buildSchema } from "graphql";
const schema = buildSchema(`
type User{
    id: ID!
    first_name: String!
    last_name: String!
    role:String!
    email: String!
    password: String!
    created_at: String!
}
type UserResponse {
    user: User!
    token: String
}

type Product{
    productid: ID!
     productname : String! 
     productsku : String! 
     productprice : Int 
     productshortdesc : String! 
     productlongdesc : String!
     created_at : String!

   
   }
   type Query {
    users: [User!]!
    products :[Product]
}
type Mutation {
        createUser(first_name:String!, 
        last_name:String!,  
        phone: String!
        password: String!
        role: String!
        email: String!):UserResponse
        login( email: String!,      password: String!):UserResponse
        createProduct( productname : String! ,  productsku : String! , productprice :  Int!, productshortdesc : String! ,productlongdesc : String!) :Product
}
schema {
    query: Query
    mutation:Mutation
}`);
export default schema;
