import { Request, Response } from "express";
import { shoe_model } from "../models/shoes.models";
import csvtojson from "csvtojson";
import fs from "fs";

export const addShoe = async (req: Request, res: Response) => {
  try {
    new shoe_model(req.body).save((error: any) => {
      error ? res.json({ msg: error.message }) : res.json({ N1: "saved" });
    });
  } catch (error) {
    res.json({ msg: error });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await shoe_model.find({});
    data ? res.json(data) : res.status(404).json({ msg: "No hay datos" });
  } catch (error) {}
};

export const postCsv = async (req: Request, res: Response) => {
  try {
    const jsonObj = await csvtojson().fromFile("csv/file.csv");
    const data = await shoe_model.insertMany(jsonObj);
    await eliminarArchivo();
    res.json(data);
  } catch (error: any) {
    await eliminarArchivo();

    if (error.code == 11000)
      res
        .status(405)
        .send({
          msg: "Ya existe la referencia",
          referncia: `${error.writeErrors[0].err.op.referencia}`,
        });
    else res.status(401).send(error);
  }
};

export const deleteShoe = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await shoe_model.deleteOne({ _id: id });
    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const putShoes =async (req:Request, res:Response) => {
  try {
    delete req.body.referencia
    const shoe = await shoe_model.updateOne({_id:req.body._id}, req.body)
    res.json(shoe)
  } catch (error) {
    res.json(error)
  }
}

const eliminarArchivo = async () => {
  setTimeout(() => {
    try {
      fs.unlinkSync("csv/file.csv");
    } catch (error) {
      console.log(error);
    }
  }, 1000);
};
