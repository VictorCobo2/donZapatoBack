import { Request, Response } from "express";
import { user_model } from "../models/user.models";
import bcryptjs from "bcryptjs";
import { generarJwt } from "../helpers/jwtGenerator";

export const addUser = async (req: Request, res: Response) => {
  try {
    new user_model(req.body).save((error) => {
      if (error) res.json(error);
      else res.json({ N1: "Succed" });
    });
  } catch (error) {}
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    const data = await user_model.updateOne({ _id: _id }, req.body);
    res.json(data);
  } catch (error) {
    res.json({ msg: error });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    let { password, newPassword, id } = req.body;
    const user = await user_model.findOne({ _id: id });
    if (user) {
      const compare = await bcryptjs.compare(password, user.contrasena);
      if (compare) {
        bcryptjs.hash(newPassword, 10, async (err: any, passwordEncryp) => {
          if (err) res.status(405).send({ msg: "Contra incorrecta" });
          else {
            newPassword = passwordEncryp;
            const data = await user_model.updateOne(
              { _id: id },
              { $set: { contrasena: newPassword } }
            );
            res.json(data);
          }
        });
      } else res.status(405).send({ msg: "Contra incorrecta" });
    } else res.status(204).send({ msg: "Usuario no existe" });
  } catch (error) {
    res.status(400).send(error);
  }
};
 
export const login = async (req: Request, res: Response) => {
  try {
    let { password, email } = req.body;
    let user = await user_model.findOne({ email: email });
    if (user) {
      const compare = await bcryptjs.compare(password, user.contrasena);
      if (compare) {
        user.contrasena = " "
        const token = await generarJwt(user._id);
        res.json({ user, token });
      } else res.status(405).send({ msg: "usuario o contra PAILAS" });
    } else res.status(405).send({ msg: "usuario o contra PAILAS" });
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};