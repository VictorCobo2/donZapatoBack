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
exports.aggUser = void 0;
const user_models_1 = require("../models/user.models");
const aggUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new user_models_1.user_model(req.body).save((error) => {
            if (error)
                res.json(error);
            else
                res.json({ N1: "Succed" });
        });
    }
    catch (error) {
    }
});
exports.aggUser = aggUser;
