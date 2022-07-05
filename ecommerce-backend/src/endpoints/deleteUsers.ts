import { Request, Response } from "express";
import { connection } from "../connection";

const deleteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    let statusCode = 500;
    const id = req.params.id as string;
    const deleteUser = await connection("labecommerce_users")
      .where({ id: id })
      .del();
    console.log(deleteUser);
    res.status(200).end();
  } catch (error: any) {
    console.log(error);
    res.status(500).send("Unexpected server error.");
  }
};
export default deleteUsers;
