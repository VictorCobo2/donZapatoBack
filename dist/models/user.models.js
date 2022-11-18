"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_model = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
user_schema.pre("save", function (next) {
    bcryptjs_1.default.hash(this.contrasena, 10, (err, newPassword) => {
        if (err)
            next(new Error("Error al encriptar"));
        else {
            this.contrasena = newPassword;
            next();
        }
    });
});
exports.user_model = (0, mongoose_1.model)("user", user_schema);
