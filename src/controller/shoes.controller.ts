import { Request, Response } from "express";
import { shoe_model } from "../models/shoes.models";
import csvtojson from "csvtojson";
import fs from 'fs'



export const addShoe = async (req: Request, res: Response) => {
  try {
    new shoe_model(req.body).save((error) => {
      error ? res.json(error) : res.json({ N1: "saved" });
    });
  } catch (error) {
    res.json(error);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await shoe_model.find();
    data ? res.json(data) : res.status(404).json({ msg: "No hay datos" });
  } catch (error) {}
};

export const postCsv = async (req: Request, res: Response) => {
  try {
    const jsonObj = await csvtojson().fromFile("csv/file.csv"); 
    const data = await shoe_model.insertMany(jsonObj);
    eliminarArchivo()
    res.json(data);
  } catch (error : any) {
    eliminarArchivo()
    if(error.code == 11000) res.status(405).send({msg:"Ya existe la referencia", referncia:`${error.writeErrors[0].err.op.referencia}`});
    else res.json(error)
  }
};

const eliminarArchivo = ()=>{
    setTimeout(() => {
        console.log("jejejjejeje")
        fs.unlinkSync('csv/file.csv')
    }, 1000);
}