import express from "express"
import { addShoe, getAll, postCsv } from "../controller/shoes.controller";
import multer from 'multer'
import path from "path";

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
shoes_route.post("/shoes/csv", upload.single('file'), postCsv)