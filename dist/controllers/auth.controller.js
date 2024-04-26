"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _models = _interopRequireDefault(require("./../models"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _randToken = _interopRequireDefault(require("rand-token"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let refreshTokens = {};
var _default = exports.default = {
  async login(req, res) {
    const {
      email,
      password
    } = req.body;
    let user = await _models.default.User.findOne({
      where: {
        email: email
      }
    });
    if (!user) {
      return res.status(401).json({
        message: "credenciales incorrectas"
      });
    }

    // verificar la constraña
    let correcto = await _bcrypt.default.compare(password, user.password);
    if (correcto) {
      // generar JWT
      let payload = {
        id: user.id,
        email: user.email,
        time: new Date()
      };
      const token = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60
      });
      const refreshToken = _randToken.default.uid(256);
      refreshTokens[refreshToken] = user.email;
      return res.status(200).json({
        access_token: token,
        refreshToken: refreshToken,
        user: user,
        error: false
      });
    } else {
      return res.status(401).json({
        message: "contraseña incorrecta"
      });
    }
  },
  async refreshToken(req, res) {
    let email = req.body.email;
    let refreshToken = req.body.refreshToken;
    if (refreshToken in refreshTokens && refreshTokens[refreshToken] == email) {
      let user = await _models.default.User.findOne({
        where: {
          email: email
        }
      });
      let payload = {
        id: user.id,
        email: user.email,
        time: new Date()
      };
      let token = _jsonwebtoken.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 60 * 60
      });
      refreshTokens[refreshToken] = "";
      return res.status(200).json({
        access_token: token,
        user: user,
        error: false
      });
    }
    return res.status(401).json({
      message: "Debe autenticarse",
      error: true
    });
  },
  registro: function (req, res) {},
  salir: (req, res) => {}
};