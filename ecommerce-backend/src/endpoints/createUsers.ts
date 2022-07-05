import { Request, Response } from "express";
import { connection } from "../connection";
import { v4 as generateId } from "uuid";
import knex from "knex";

const createUser = async (req: Request, res: Response): Promise<void> => {
  let statusCode = 500;
  try {
    const newId = generateId();
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error(
        "Singup procedure can't be completed without a name, an email or a password. Please review your information."
      );
    }
    const newUser = await connection("labecommerce_users").insert({
      id: newId,
      name: name,
      email: email,
      password: password,
    });
    res.status(statusCode).send("Success! Welcome to our database.");
  } catch (error: any) {
    console.log(error);
    res.status(statusCode).end();
  }
};

export default createUser;
