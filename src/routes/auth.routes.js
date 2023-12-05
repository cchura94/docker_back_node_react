const { Router } = require("express")

// const authController = require("./../controllers/auth.controller")
import authController from "./../controllers/auth.controller";

const RouteAuth = Router()

RouteAuth.post("/login", authController.login);
RouteAuth.post("/refresh-token", authController.refreshToken);
RouteAuth.post("/register", authController.registro);
RouteAuth.post("/logout", authController.salir);

// module.exports = RouteAuth
export default RouteAuth;