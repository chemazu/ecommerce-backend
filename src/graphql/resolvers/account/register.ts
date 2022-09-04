import Joi from "joi";
import pool from "../../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (args: {
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  email: string;
  role: string;
}) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    role: Joi.string().required(),
  });
  const { error } = schema.validate(args);

  if (error) {
    throw new Error(error.details[0].message);
  }
  const { first_name, last_name, phone, email, role, password } = args;
  let created_at = new Date();
  let encryptedPassword = await bcrypt.hash(password, 10);

  return pool
    .query(
      "INSERT INTO users (first_name,last_name,phone,email,role,created_at,password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
      [first_name, last_name, phone, email, role, created_at, encryptedPassword]
    )
    .then((res) => {
      console.log(res.rows);
      let token = jwt.sign(
        { email: res.rows[0].email },
        process.env.JWT_SECRET
      );
      return { user: res.rows[0], token };
    })
    .catch((error) => {
      console.log(error);
    });
  //  pool.query(
  //   "INSERT INTO users (first_name,last_name,phone,email,role,created_at,password) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
  //   [
  //     first_name,
  //     last_name,
  //     phone,
  //     email,
  //     role,
  //     created_at,
  //     encryptedPassword,
  //   ],
  //   (error, results) => {
  //     // console.log( results.rows);
  //     // let token = jwt.sign({ email: results.email }, process.env.JWT_SECRET);
  //     return {
  //       user: {
  //         id: "",
  //         first_name: "",
  //         last_name: "",
  //         role: "",
  //         email: "",
  //         password: "",
  //         created_at: "",
  //       },
  //       token: "",
  //     };
  //   }
  // );
  // pool.connect((err, client, release) => {
  //   if (err) {
  //     return console.error("Error acquiring client", err.stack);
  //   }
  //   client.query("SELECT * FROM users", (err, result) => {
  //     release();
  //     if (err) {
  //       return console.error("Error executing query", err.stack);
  //     }
  //     console.log(result.rows,"sds");
  //   });
  // });
};
