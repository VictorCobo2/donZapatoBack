"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoe_model = void 0;
const mongoose_1 = require("mongoose");
const shoe_schema = new mongoose_1.Schema({
    referencia: {
        type: String,
        required: [true, "La referencia es requerida"],
        unique: true
    },
    marca: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    p_compra: {
        type: String,
        required: true
    },
    p_venta: {
        type: String,
        required: true
    },
    image: {
        type: String,
        //required:true
    },
});
shoe_schema.pre("save", function (next) {
    const compra = this.p_compra.split(".");
    const venta = this.p_venta.split(".");
    if (compra.join('') && venta.join('')) {
        next();
    }
    else {
        next(new Error("Datos invalidos"));
    }
});
exports.shoe_model = (0, mongoose_1.model)("shoes", shoe_schema);
