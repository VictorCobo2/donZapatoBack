import express from "express"
import { addUser, changePassword, editUser, login } from "../controller/user.controller";


export const user_route = express.Router();

user_route.post("/user/register", addUser)
user_route.put("/user/edit", editUser)
user_route.put("/user/changePassword", changePassword)
user_route.put("/user/login", login)