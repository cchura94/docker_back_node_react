import { body } from "express-validator"

export const usuarioCheck = () => {
    return [
        body('username').trim().not().notEmpty().withMessage('El campo username no debe estar vacio'),
        body('email').trim().not().notEmpty().withMessage('El campo email no debe estar vacio'),
        body('password').trim().not().notEmpty().withMessage('El campo contraseña no debe estar vacio'),
    ]
}

