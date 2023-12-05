import models from "./../models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import randToken from "rand-token"

let refreshTokens= {}

export default {
    async login(req, res){
        const {email, password} = req.body;

        let user = await models.User.findOne({
            where: {email: email}
        })

        if(!user){
            return res.status(401).json({message: "credenciales incorrectas"});
        }

        // verificar la constraña
        let correcto = await bcrypt.compare(password, user.password);

        if(correcto){
            // generar JWT
            let payload = {
                id: user.id,
                email: user.email,
                time: new Date()
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 60*60
            });


            
            const refreshToken = randToken.uid(256);

            refreshTokens[refreshToken] = user.email;

            return res.status(200).json({
                access_token: token,
                refreshToken: refreshToken,
                user: user,
                error: false
            })

        }else{
            return res.status(401).json({
                message: "contraseña incorrecta"
            })
        }

    },
    async refreshToken(req, res){
        let email = req.body.email;
        let refreshToken = req.body.refreshToken;

        if((refreshToken in refreshTokens) && (refreshTokens[refreshToken]==email)){
            let user = await models.User.findOne({
                where: {email: email}
            })

            let payload = {
                id: user.id,
                email: user.email,
                time: new Date()
            }

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 60*60
            })

            refreshTokens[refreshToken] = ""

            return res.status(200).json({
                access_token: token,
                user: user,
                error: false
            })
        }
        return res.status(401).json({
            message: "Debe autenticarse",
            error: true
        })
    },
    registro: function(req, res){

    },
    salir: (req, res) => {

    }
}