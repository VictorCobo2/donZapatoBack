"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("dotenv/config");
//rutas----------------------------------------
const routes = __importStar(require("./routes/index"));
const port = process.env.PORT || 9000;
const app = (0, express_1.default)();
dotenv_1.default.config();
//MIDELWAR
app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', 'http://192.168.0.173:8080'); //Con este damos acceso a la api unicamente desde el dominio que se ponga.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(express_1.default.json({ limit: '50mb' }));
app.use("/api", routes.SHOES);
app.use("/api", routes.USER);
app.get("/", (req, res) => {
    res.send(`Funciona la api en el puerto ${port}`);
});
mongoose_1.default
    .connect(`mongodb://localhost:27017/shoeDB`)
    //.connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("Conectado a mongo correctamente 🟢"))
    .catch((error) => {
    console.log("No se pudo conectar a la DB  🔴");
    console.error(error);
});
app.listen(port, () => console.log("Esuchando en el puerto: ", port));
