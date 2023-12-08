// importaciones
// es6 a es5 (transpilar) // npm run build
// const express = require("express")
import express from "express"
import cors from 'cors'
import morgan from 'morgan'

require('dotenv').config()

import RouteAuth from "./routes/auth.routes";
import RouteAdmin from "./routes/admin.routes";

// inicializando
const app = express()
const http = require('http').Server(app)
app.use(cors())

app.use(morgan('dev'))
// carga de archivos estaticos
app.use(express.static('public'));

// habilitar req.body
app.use(express.json());

// variables
const PORT = process.env.PORT || 3000

// rutas
app.use("/api/v1/admin", RouteAdmin)
app.use("/api/v1/auth", RouteAuth)

// levantar el servidor
http.listen(PORT, () => {
    console.log(`Servidor iniciado en http://127.0.0.1:${PORT}`)
})
