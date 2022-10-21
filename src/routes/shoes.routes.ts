import express from "express"
import { addShoe, getAll } from "../controller/shoes.controller";

export const shoes_route = express.Router();

shoes_route.post("/shoes/add", addShoe)
shoes_route.get("/shoes/all", getAll)