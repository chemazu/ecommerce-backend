import pool from "../../../db";

const forgotPassword = async (args: { email: string }) => {
  const { email } = args;
  const userDb = await pool.query("SELECT * FROM users WHERE email =$1", [
    email,
  ]);
  if (userDb.rows < 1) {
    throw new Error("Invalid Credentials");
  }
  console.log("first")
};
