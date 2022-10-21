"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoe_model = void 0;
const mongoose_1 = require("mongoose");
const shoe_schema = new mongoose_1.Schema({
    referencia: {
        type: String,
        required: true,
        unique: true
    },
    marca: {
        type: String,
        required: true
    },
    stock: {
        type: String,
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
        required: true
    },
});
exports.shoe_model = (0, mongoose_1.model)("shoes", shoe_schema);
