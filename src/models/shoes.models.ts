import {Schema, model} from "mongoose";

interface shoe {
    referencia:String,
    marca:String,
    stock:Number,
    p_compra:Number,
    p_venta:Number,
    image:String
}

const shoe_schema = new Schema<shoe>({
    referencia:{
        type:String,
        required:true,
        unique:true
    },
    marca:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    },
    p_compra:{
        type:String,
        required:true
    },
    p_venta:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
});

export const shoe_model = model<shoe>("shoes", shoe_schema);