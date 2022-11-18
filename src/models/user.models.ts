import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs"
import { timeStamp } from "console";
interface user {
    nombre:string,
    email:string,
    storeName:string,
    contrasena:string,
    photo:string,
    portada:string,
}


const user_schema = new Schema<user>({
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    storeName:{
        type:String,
        required:true
    },
    contrasena:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    },
    portada:{
        type:String,
        required:true
    },
});

user_schema.pre("save", function(next) {
    bcryptjs.hash(this.contrasena, 10, (err:any, newPassword) =>{
        if(err) next( new Error("Error al encriptar"))
        else {
            this.contrasena = newPassword
            next()
        }
    })
})

export const user_model = model<user>("user", user_schema)