import { Request, Response } from "express";
import { connection } from "../connection";
import { v4 as generateId } from "uuid";

const createPurchase = async (req: Request, res: Response): Promise<void> => {
  let statusCode = 500;
  try {
    const newId = generateId();

    const { user_id, product_id, quantity } = req.body;

    const productValue: any = await connection("labecommerce_products")
      .select("price")
      .where("id", product_id);
    console.log(productValue[0]);

    const total_price = Number(quantity * productValue[0].price);
    console.log(total_price);

    if (!user_id || !product_id || !quantity || !total_price) {
      throw new Error(
        "This procedure cannot be completed without an user_id, a product_id, a quantity or total_price. Please review your information."
      );
    }

    const newPurchase = await connection("labecommerce_purchases").insert({
      id: newId,
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
      total_price: total_price,
    });

    res
      .status(statusCode)
      .send("Success! Always check your cart before finishing your purchase.");
  } catch (error: any) {
    console.log(error);
    res.status(statusCode).end();
  }
};

export default createPurchase;
