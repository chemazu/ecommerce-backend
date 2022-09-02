import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = async (args: {
  name: string;
  phone: string;
  password: string;
  type: string;
  email: string;
}) => {
  console.log(args);
  //   validation
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.string().required(),
    email: Joi.string().required(),
  });
  const { error } = schema.validate(args);

  if (error) {
    throw new Error(error.details[0].message);
  }
  try {
    // return { title: "register" };
    console.log("first");
  } catch (error) {
    throw new Error(error.message);
  }
};
