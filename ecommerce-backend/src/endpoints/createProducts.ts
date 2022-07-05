import { Request, Response } from "express";
import { connection } from "../connection";
import { v4 as generateId } from "uuid";

const createProduct = async (req: Request, res: Response): Promise<void> => {
  let statusCode = 500;
  try {
    const newId = generateId();
    const { name, price, image_url } = req.body;
    if (!name || !price || !image_url) {
      statusCode = 412;
      throw new Error(
        "Procedure can't be completed without a name, a price or an image_url. Please review your information."
      );
    }
    await connection("labecommerce_products").insert({
      id: newId,
      name: name,
      price: price,
      image_url: image_url,
    });
    res.status(200).send("New product inserted into our database.");
  } catch (error: any) {
    console.log(error);
    res.status(statusCode).end();
  }
};
export default createProduct;
