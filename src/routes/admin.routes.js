
const { Router } = require("express")
const usuarioController = require("./../controllers/usuario.controller")
import categoriaController from "../controllers/categoria.controller";
import productoController from "../controllers/producto.controller";
import authMiddleware from "../middlewares/auth.middleware";

import { usuarioCheck } from "../helpers/validators"

const Route = Router()

Route.get("/usuario", authMiddleware, usuarioController.funListar); // listar
Route.post("/usuario", authMiddleware, usuarioCheck(), usuarioController.funGuardar); // guardar
Route.get("/usuario/:id", authMiddleware,usuarioController.funMostrar); // mostrar
Route.put("/usuario/:id", authMiddleware, usuarioController.funModificar); // modificar
Route.delete("/usuario/:id", authMiddleware, usuarioController.funEliminar); // modificar

// rutas de categoria
Route.get("/categoria", categoriaController.listar);
Route.post("/categoria", categoriaController.guardar);
Route.get("/categoria/:id", categoriaController.mostrar);
Route.put("/categoria/:id", categoriaController.modificar);
Route.delete("/categoria/:id", categoriaController.eliminar);

// rutas de producto
Route.get("/producto", productoController.listar);
Route.post("/producto", productoController.guardar);
Route.get("/producto/:id", productoController.mostrar);
Route.put("/producto/:id", productoController.modificar);
Route.delete("/producto/:id", productoController.eliminar);

Route.get("/", function(req, res){
    return res.status(200).json({"message": "Web Service (API Rest)"});
})

// module.exports = Route
export default Route;