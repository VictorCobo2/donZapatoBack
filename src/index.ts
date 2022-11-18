import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import "dotenv/config";
//rutas----------------------------------------
import * as routes from "./routes/index"


const port = process.env.PORT || 9000;
const app = express();
 
dotenv.config();

//MIDELWAR
app.use((req: Request, res: Response, next: NextFunction) => {
  //res.header('Access-Control-Allow-Origin', 'http://192.168.0.173:8080'); //Con este damos acceso a la api unicamente desde el dominio que se ponga.
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.json({limit: '50mb'}));
app.use("/api", routes.SHOES)
app.use("/api", routes.USER)

app.get("/", (req, res) => {
  res.send(`Funciona la api en el puerto ${port}`);
});

mongoose
  .connect(`mongodb://localhost:27017/shoeDB`)
  //.connect(`${process.env.MONGO_URI}`)
  .then(() => console.log("Conectado a mongo correctamente 🟢"))
  .catch((error) => {
    console.log("No se pudo conectar a la DB  🔴");
    console.error(error);
  });

app.listen(port, () => console.log("Esuchando en el puerto: ", port));

