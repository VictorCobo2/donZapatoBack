"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_model = void 0;
const mongoose_1 = require("mongoose");
const user_schema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    portada: {
        type: String,
        required: true
    },
});
exports.user_model = (0, mongoose_1.model)("user", user_schema);
