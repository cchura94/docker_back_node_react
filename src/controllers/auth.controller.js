import models from "./../models"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

            const token = jwt.sign(payload, "MI_CODIGO_SECRETO", {
                expiresIn: 60*60
            });

            return res.status(200).json({
                access_token: token,
                user: user,
                error: false
            })

        }else{
            return res.status(401).json({
                message: "contraseña incorrecta"
            })
        }

    },
    registro: function(req, res){

    },
    salir: (req, res) => {

    }
}