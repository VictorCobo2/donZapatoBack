import {Schema, model} from "mongoose";

interface shoe {
    referencia:String,
    marca:String,
    stock:number,
    p_compra:string,
    p_venta:string,
    image:String
}

const shoe_schema = new Schema<shoe>({
    referencia:{
        type:String,
        required:[true, "La referencia es requerida"],
        unique:true
    },
    marca:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
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
        //required:true
    },
});

shoe_schema.pre("save", function (next) {
    const compra = this.p_compra.split(".")
    const venta = this.p_venta.split(".")
    if (compra.join('') && venta.join('')){
        next()
    }else{
        next(new Error("Datos invalidos"))
    }
})

export const shoe_model = model<shoe>("shoes", shoe_schema);