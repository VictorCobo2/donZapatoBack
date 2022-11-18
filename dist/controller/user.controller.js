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
exports.login = exports.changePassword = exports.editUser = exports.addUser = void 0;
const user_models_1 = require("../models/user.models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwtGenerator_1 = require("../helpers/jwtGenerator");
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new user_models_1.user_model(req.body).save((error) => {
            if (error)
                res.json(error);
            else
                res.json({ N1: "Succed" });
        });
    }
    catch (error) { }
});
exports.addUser = addUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const data = yield user_models_1.user_model.updateOne({ _id: _id }, req.body);
        res.json(data);
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.editUser = editUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let { password, newPassword, id } = req.body;
        const user = yield user_models_1.user_model.findOne({ _id: id });
        if (user) {
            const compare = yield bcryptjs_1.default.compare(password, user.contrasena);
            if (compare) {
                bcryptjs_1.default.hash(newPassword, 10, (err, passwordEncryp) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err)
                        res.status(405).send({ msg: "Contra incorrecta" });
                    else {
                        newPassword = passwordEncryp;
                        const data = yield user_models_1.user_model.updateOne({ _id: id }, { $set: { contrasena: newPassword } });
                        res.json(data);
                    }
                }));
            }
            else
                res.status(405).send({ msg: "Contra incorrecta" });
        }
        else
            res.status(204).send({ msg: "Usuario no existe" });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.changePassword = changePassword;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { password, email } = req.body;
        console.log(req.body);
        let user = yield user_models_1.user_model.findOne({ email: email });
        if (user) {
            const compare = yield bcryptjs_1.default.compare(password, user.contrasena);
            if (compare) {
                user.contrasena = " ";
                const token = yield (0, jwtGenerator_1.generarJwt)(user._id);
                res.json({ user, token });
            }
            else
                res.status(405).send({ msg: "usuario o contra PAILAS" });
        }
        else
            res.status(405).send({ msg: "usuario o contra PAILAS" });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});
exports.login = login;
