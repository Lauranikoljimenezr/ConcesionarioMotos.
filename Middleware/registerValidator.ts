import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const registerValidatorParams = [
    check('email').isEmail().withMessage('Debe ingresar un correo valido que tenga @'),
    check('password').isLength({ min: 8, max: 15 }).withMessage('La contraseña debe tener entre 8 y 15 caracteres'),
    check('name').isLength({ min: 1, max: 200 }).withMessage('El nombre es obligatorio y no puede exceder los 200 caracteres'),
    check('lastName').isLength({ min: 1, max: 200 }).withMessage('El apellido es obligatorio y no puede exceder los 200 caracteres'),
    check('phoneNumber').isNumeric().isLength({ min: 10, max: 10 }).withMessage('El número de teléfono debe tener 10 dígitos'),
    check('domicilio').isLength({ min: 1, max: 200 }).withMessage('El domicilio es obligatorio y no puede exceder los 200 caracteres')
];

function registerValidator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export { registerValidatorParams, registerValidator };
