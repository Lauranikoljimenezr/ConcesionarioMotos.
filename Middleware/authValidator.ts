import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const authValidatorParams = [
    check('email').isEmail().withMessage('Debe ingresar un correo valido'),
    check('password').isLength({ min: 8, max: 15 }).withMessage('La contraseña debe tener entre 8 y 15 caracteres'),
];

function authValidator(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export { authValidatorParams, authValidator };
