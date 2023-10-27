const { Router } = require("express")
const usuarioController = require("./../controllers/usuario.controller")

const Route = Router()

Route.get("/usuario", usuarioController.funListar); // listar
Route.post("/usuario", usuarioController.funGuardar); // guardar
Route.get("/usuario/:id", usuarioController.funMostrar); // mostrar
Route.put("/usuario/:id", usuarioController.funModificar); // modificar
Route.delete("/usuario/:id", usuarioController.funEliminar); // modificar

Route.get("/", function(req, res){
    return res.status(200).json({"message": "Web Service (API Rest)"});
})

// module.exports = Route
export default Route;