// productid | productname | productsku | productprice | productshortdesc | productlongdesc
import pool from "../../../db";

const getProducts = async () => {
  const dbUser = await pool.query("SELECT * FROM products");
  return { status: "success", data: dbUser.rows };
};
export default getProducts;
