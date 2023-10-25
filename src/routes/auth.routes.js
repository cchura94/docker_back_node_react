const { Router } = require("express")

const authController = require("./../controllers/auth.controller")

export const RouteAuth = Router()

RouteAuth.post("/login", authController.login);
RouteAuth.post("/register", authController.registro);
RouteAuth.post("/logout", authController.salir);

// module.exports = RouteAuth