import mongoose from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
//rutas----------------------------------------
import * as routes from "./routes/index"

const port = process.env.PORT || 9000;
const app = express();

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

app.use(express.json());
app.use("/api", routes.SHOES)

app.get("/", (req, res) => {
  res.send(`Funciona la api en el puerto ${port}`);
});

mongoose
  .connect(`mongodb://localhost:27017/shoeDB`)
  .then(() => console.log("Conectado a mongo correctamente 🟢"))
  .catch((error) => {
    console.log("No se pudo conectar a la DB  🔴");
    console.error(error);
  });

app.listen(port, () => console.log("Esuchando en el puerto: ", port));
