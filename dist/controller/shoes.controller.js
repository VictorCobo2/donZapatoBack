"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.addShoe = void 0;
const shoes_models_1 = require("../models/shoes.models");
const addShoe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new shoes_models_1.shoe_model(req.body).save((error) => {
            error ? res.json(error) : res.json({ N1: "saved" });
        });
    }
    catch (error) {
        res.json(error);
    }
});
exports.addShoe = addShoe;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield shoes_models_1.shoe_model.find();
        data ? res.json(data) : res.status(404).json({ msg: "No hay datos" });
    }
    catch (error) {
    }
});
exports.getAll = getAll;
