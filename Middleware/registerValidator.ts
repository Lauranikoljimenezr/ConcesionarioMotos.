import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { log } from "console";

const validatorParams =[
    check('email').isEmail().withMessage('Debe ingresar un correo valido que tenga @'),
    check('password').isLength({min: 8, max: 15}).withMessage('la password debe tener entre 8 y 15 caracteres'),
    check('name').isLength({min:1 , max:200}).withMessage('El name es obligatorio y no puede exceder los 200 caracteres'),
    check('lastName').isLength({min:1 , max:200}).withMessage('El lastName es obligatorio y no puede exceder los 200 caracteres'),
    check('phoneNumber').isNumeric().isLength({min:10 , max:10}).withMessage('El phoneNumber solo puede tener numeros'),
    check('domicilio').isLength({min:1 , max:200}).withMessage('El domicilio es obligatorio y no puede exceder los 200 caracteres'),
];
    
    function validator(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(errors);
        
        next();
    }

    export {validatorParams, validator};
