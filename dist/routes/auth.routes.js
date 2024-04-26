"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _auth = _interopRequireDefault(require("./../controllers/auth.controller"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  Router
} = require("express");

// const authController = require("./../controllers/auth.controller")

const RouteAuth = Router();
RouteAuth.post("/login", _auth.default.login);
RouteAuth.post("/refresh-token", _auth.default.refreshToken);
RouteAuth.post("/register", _auth.default.registro);
RouteAuth.post("/logout", _auth.default.salir);

// module.exports = RouteAuth
var _default = exports.default = RouteAuth;