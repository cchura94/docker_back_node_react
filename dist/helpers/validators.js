"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usuarioCheck = void 0;
var _expressValidator = require("express-validator");
const usuarioCheck = () => {
  return [(0, _expressValidator.body)('username').trim().not().notEmpty().withMessage('El campo username no debe estar vacio'), (0, _expressValidator.body)('email').trim().not().notEmpty().withMessage('El campo email no debe estar vacio'), (0, _expressValidator.body)('password').trim().not().notEmpty().withMessage('El campo contraseña no debe estar vacio')];
};
exports.usuarioCheck = usuarioCheck;