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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCsv = exports.getAll = exports.addShoe = void 0;
const shoes_models_1 = require("../models/shoes.models");
const csvtojson_1 = __importDefault(require("csvtojson"));
const fs_1 = __importDefault(require("fs"));
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
    catch (error) { }
});
exports.getAll = getAll;
const postCsv = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jsonObj = yield (0, csvtojson_1.default)().fromFile("csv/file.csv");
        const data = yield shoes_models_1.shoe_model.insertMany(jsonObj);
        eliminarArchivo();
        res.json(data);
    }
    catch (error) {
        eliminarArchivo();
        if (error.code == 11000)
            res.status(405).send({ msg: "Ya existe la referencia", referncia: `${error.writeErrors[0].err.op.referencia}` });
        else
            res.json(error);
    }
});
exports.postCsv = postCsv;
const eliminarArchivo = () => {
    setTimeout(() => {
        console.log("jejejjejeje");
        fs_1.default.unlinkSync('csv/file.csv');
    }, 1000);
};
