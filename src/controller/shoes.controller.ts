import {Request, Response} from "express"
import { shoe_model } from "../models/shoes.models"

export const addShoe = async (req:Request, res:Response)=>{
    try {
        new shoe_model(req.body).save((error)=>{
            error ? res.json(error) : res.json({N1: "saved"})
        })
    } catch (error) {
        res.json(error) 
    }
} 


export const getAll = async (req:Request, res:Response)=>{
    try {
        const data = await shoe_model.find()
        data ? res.json(data) : res.status(404).json({msg:"No hay datos"})
    } catch (error) {
        
    }
}

 