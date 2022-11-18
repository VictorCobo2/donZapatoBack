import express from "express"
import { addShoe, deleteShoe, getAll, postCsv, putShoes } from "../controller/shoes.controller";
import multer from 'multer'
import path from "path";

console.clear()

let storage  = multer.diskStorage({
   destination:(req, file, cb) =>{
    cb(null, "./csv")
   },
   filename:(req, file, cb) =>{
    cb(null, file.fieldname + path.extname(file.originalname))
   }
})

const upload = multer({storage})

export const shoes_route = express.Router();

shoes_route.post("/shoes/add", addShoe)
shoes_route.get("/shoes/all", getAll)
shoes_route.post("/shoes/csv", postCsv)
shoes_route.delete("/shoes/delete/:id", deleteShoe) 
shoes_route.put("/shoes/edit", putShoes)