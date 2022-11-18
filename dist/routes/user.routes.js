"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user_route = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
exports.user_route = express_1.default.Router();
exports.user_route.post("/user/register", user_controller_1.addUser);
exports.user_route.put("/user/edit", user_controller_1.editUser);
exports.user_route.put("/user/changePassword", user_controller_1.changePassword);
exports.user_route.put("/user/login", user_controller_1.login);
