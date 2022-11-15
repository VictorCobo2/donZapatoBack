"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoes_route = void 0;
const express_1 = __importDefault(require("express"));
const shoes_controller_1 = require("../controller/shoes.controller");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
console.clear();
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./csv");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
exports.shoes_route = express_1.default.Router();
exports.shoes_route.post("/shoes/add", shoes_controller_1.addShoe);
exports.shoes_route.get("/shoes/all", shoes_controller_1.getAll);
exports.shoes_route.post("/shoes/csv", upload.single('file'), shoes_controller_1.postCsv);
exports.shoes_route.delete("/shoes/delete/:id", shoes_controller_1.deleteShoe);
exports.shoes_route.put("/shoes/edit", shoes_controller_1.putShoes);
