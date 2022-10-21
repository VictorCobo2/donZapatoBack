"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoes_route = void 0;
const express_1 = __importDefault(require("express"));
const shoes_controller_1 = require("../controller/shoes.controller");
exports.shoes_route = express_1.default.Router();
exports.shoes_route.post("/shoes/add", shoes_controller_1.addShoe);
exports.shoes_route.get("/shoes/all", shoes_controller_1.getAll);
