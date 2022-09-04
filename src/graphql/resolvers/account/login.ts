import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../../../db";

const login = async (args: { email: string; password: string }) => {
  // console.log(args)
  const { password, email } = args;
  const userDb = await pool.query("SELECT * FROM users WHERE email =$1", [
    email,
  ]);
  if (userDb.rows < 1) {
    throw new Error("Invalid Credentials");
  }
  let user = userDb.rows[0];
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log(isPasswordValid, user);
  const pass = await bcrypt.compare(password, user.password);
  if (pass && user) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
    return { user, token };
  }
  throw new Error("Invalid Credentials");
};
export default login;
