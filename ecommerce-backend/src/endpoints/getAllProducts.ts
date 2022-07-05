import { Request, Response } from "express";
import { connection } from "../connection";

const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, order, orderType, page } = req.query;

    const resultsPerPage = 5;
    const offset = resultsPerPage * (Number(page) - 1);
    const allProductsOrdered = await connection("labecommerce_products")
      .where("name", "like", `%${name}%`)
      .orderBy((order as string) || "name", orderType as string)
      .offset(offset);

    /* const allProducts = await connection("labecommerce_products"); */

    res.status(200).send(allProductsOrdered);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unexpected server error.");
  }
};
export default getAllProducts;
