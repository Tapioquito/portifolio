import { Request, Response } from "express";
import { connection } from "../connection";
import { v4 as generateId } from "uuid";
import knex from "knex";

const getproductsByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user_id = req.params.user_id as string;

    const productsByUserId = await connection("labecommerce_purchases")
      .select("product_id")
      .where("user_id", "like", `${user_id}`);

    res.status(200).send(productsByUserId);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected server error.");
  }
};
export default getproductsByUserId;
