import pool from "../../../db";
import Joi from "joi";
import { json } from "express";
const createProduct = async (args: {
  productname;
  productsku: string;
  productprice: number;
  productshortdesc: string;
  productlongdesc: string;
}) => {
  const schema = Joi.object({
    productname: Joi.string().required(),
    productsku: Joi.string().required(),
    productprice: Joi.number().required(),
    productshortdesc: Joi.string().required(),
    productlongdesc: Joi.string().required(),
  });
  const { error } = schema.validate(args);
  if (error) {
    throw new Error(error.details[0].message);
  }
  const {
    productname,
    productsku,
    productprice,
    productshortdesc,
    productlongdesc,
  } = args;
  let created_at = new Date();
  return pool
    .query(
      "INSERT INTO products ( productname, productsku, productprice, productshortdesc,productlongdesc,created_at)VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        productname,
        productsku,
        productprice,
        productshortdesc,
        productlongdesc,
        created_at,
      ]
    )
    .then((res: { rows: any[] }) => {
      return res.rows[0];

    });
};

export default createProduct;
