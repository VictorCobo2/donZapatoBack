import {Request, Response} from "express"
import { shoe_model } from "../models/shoes.models"

export const add_shoe = async (req:Request, res:Response)=>{
    try {
        console.log(req.body)
        new shoe_model(req.body).save((error)=>{
            error ? res.json(error) : res.json({N1: "saved"})
        })
    } catch (error) {
        res.json(error) 
    }
} 

 