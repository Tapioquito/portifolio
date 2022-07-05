import express, { Request, Response } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import { connection } from "./connection";
import { v4 } from "uuid";
import createUser from "./endpoints/createUsers";
import createProduct from "./endpoints/createProducts";
import getAllUsers from "./endpoints/getAllUsers";
import getAllProducts from "./endpoints/getAllProducts";
import deleteUsers from "./endpoints/deleteUsers";
import createPurchase from "./endpoints/createPurchase";
import getproductsByUserId from "./endpoints/getProductsById";
import getAllPurchases from "./endpoints/getAllPurchases";
//middlewares
const app = express();
app.use(express.json());
app.use(cors());

//GET stuff:
app.get("/users", getAllUsers);
app.get("/products", getAllProducts);
app.get("/purchases", getAllPurchases);
app.get("/users/:user_id/purchases", getproductsByUserId);

//CREATE stuff:
app.post("/users", createUser);
app.post("/products", createProduct);
app.post("/purchases", createPurchase);

//DELETE this mf:
app.delete("/users/:id", deleteUsers);

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
