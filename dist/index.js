"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _admin = _interopRequireDefault(require("./routes/admin.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// importaciones
// es6 a es5 (transpilar) // npm run build
// const express = require("express")

require('dotenv').config();
// inicializando
const app = (0, _express.default)();
const http = require('http').Server(app);
app.use((0, _cors.default)());
app.use((0, _morgan.default)('dev'));
// carga de archivos estaticos
app.use(_express.default.static('public'));

// habilitar req.body
app.use(_express.default.json());

// variables
const PORT = process.env.PORT || 3000;

// rutas
app.use("/api/v1/admin", _admin.default);
app.use("/api/v1/auth", _auth.default);

// levantar el servidor
http.listen(PORT, () => {
  console.log(`Servidor iniciado en: http://127.0.0.1:${PORT}`);
});