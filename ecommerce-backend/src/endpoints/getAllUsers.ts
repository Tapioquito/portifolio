import { Request, Response } from "express";
import { connection } from "../connection";
import knex from "knex";

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const usersAndPurchases = await connection("labecommerce_users").innerJoin(
      "labecommerce_purchases",
      function () {
        this.on("labecommerce_purchases.user_id", "=", "labecommerce_users.id");
      }
    );

    res.status(200).send(usersAndPurchases);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected server error.");
  }
};
export default getAllUsers;
