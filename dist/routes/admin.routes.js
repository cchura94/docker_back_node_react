"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _categoria = _interopRequireDefault(require("../controllers/categoria.controller"));
var _producto = _interopRequireDefault(require("../controllers/producto.controller"));
var _auth = _interopRequireDefault(require("../middlewares/auth.middleware"));
var _validators = require("../helpers/validators");
var _multer = _interopRequireDefault(require("multer"));
var _pedido = _interopRequireDefault(require("../controllers/pedido.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Router
} = require("express");
const usuarioController = require("./../controllers/usuario.controller");
const {
  S3Client
} = require('@aws-sdk/client-s3');
const multerS3 = require("multer-s3");
const s3 = new S3Client();

// subida de imagenes

const storage = _multer.default.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/imagenes");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = (0, _multer.default)({
  storage: storage
});

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
Route.post("/producto/:id/actualizar-imagen", _auth.default, upload.single("imagen"), _producto.default.actualizarImagen);
Route.get("/usuario", _auth.default, usuarioController.funListar); // listar
Route.post("/usuario", _auth.default, (0, _validators.usuarioCheck)(), usuarioController.funGuardar); // guardar
Route.get("/usuario/:id", _auth.default, usuarioController.funMostrar); // mostrar
Route.put("/usuario/:id", _auth.default, usuarioController.funModificar); // modificar
Route.delete("/usuario/:id", _auth.default, usuarioController.funEliminar); // modificar

// rutas de categoria
Route.get("/categoria", _auth.default, _categoria.default.listar);
Route.post("/categoria", _auth.default, _categoria.default.guardar);
Route.get("/categoria/:id", _auth.default, _categoria.default.mostrar);
Route.put("/categoria/:id", _auth.default, _categoria.default.modificar);
Route.delete("/categoria/:id", _auth.default, _categoria.default.eliminar);

// rutas de producto
Route.get("/producto", _producto.default.listar);
Route.post("/producto", _producto.default.guardar);
Route.get("/producto/:id", _producto.default.mostrar);
Route.put("/producto/:id", _producto.default.modificar);
Route.delete("/producto/:id", _producto.default.eliminar);

// rutas de pedido
Route.get("/pedido", _pedido.default.listar);
Route.post("/pedido", _pedido.default.guardar);
Route.get("/pedido/buscar-cliente", _pedido.default.buscarCliente);
Route.post("/pedido/nuevo-cliente", _pedido.default.pedidoNuevoCliente);
Route.get("/", function (req, res) {
  return res.status(200).json({
    message: "Web Service (API Rest)"
  });
});

// module.exports = Route
var _default = exports.default = Route;