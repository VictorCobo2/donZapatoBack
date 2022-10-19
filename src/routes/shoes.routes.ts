import express from "express"
import { add_shoe } from "../controller/shoes.controller";

export const shoes_route = express.Router();

shoes_route.post("/shoes/add", add_shoe)