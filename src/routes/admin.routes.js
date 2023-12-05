const { Router } = require("express");
const usuarioController = require("./../controllers/usuario.controller");
import categoriaController from "../controllers/categoria.controller";
import productoController from "../controllers/producto.controller";
import authMiddleware from "../middlewares/auth.middleware";

import { usuarioCheck } from "../helpers/validators";

const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require("multer-s3");
const s3 = new S3Client();

// subida de imagenes
import multer from "multer";
import pedidoController from "../controllers/pedido.controller";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/imagenes");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/*
  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'some-bucket',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  })
  */

const Route = Router();

// actualizar imagen
Route.post(
  "/producto/:id/actualizar-imagen",
  authMiddleware,
  upload.single("imagen"),
  productoController.actualizarImagen
);

Route.get("/usuario", authMiddleware, usuarioController.funListar); // listar
Route.post(
  "/usuario",
  authMiddleware,
  usuarioCheck(),
  usuarioController.funGuardar
); // guardar
Route.get("/usuario/:id", authMiddleware, usuarioController.funMostrar); // mostrar
Route.put("/usuario/:id", authMiddleware, usuarioController.funModificar); // modificar
Route.delete("/usuario/:id", authMiddleware, usuarioController.funEliminar); // modificar

// rutas de categoria
Route.get("/categoria", authMiddleware, categoriaController.listar);
Route.post("/categoria", authMiddleware, categoriaController.guardar);
Route.get("/categoria/:id", authMiddleware, categoriaController.mostrar);
Route.put("/categoria/:id", authMiddleware, categoriaController.modificar);
Route.delete("/categoria/:id", authMiddleware, categoriaController.eliminar);

// rutas de producto
Route.get("/producto", productoController.listar);
Route.post("/producto", productoController.guardar);
Route.get("/producto/:id", productoController.mostrar);
Route.put("/producto/:id", productoController.modificar);
Route.delete("/producto/:id", productoController.eliminar);

// rutas de pedido
Route.get("/pedido", pedidoController.listar);
Route.post("/pedido", pedidoController.guardar);

Route.get("/pedido/buscar-cliente", pedidoController.buscarCliente);

Route.post("/pedido/nuevo-cliente", pedidoController.pedidoNuevoCliente);

Route.get("/", function (req, res) {
  return res.status(200).json({ message: "Web Service (API Rest)" });
});

// module.exports = Route
export default Route;
