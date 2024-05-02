import UserRepository from '../repositories/UserRepository.js';
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";

const secretKey = 'Laurappp'; 

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const storedPassword = await UserRepository.getUserPassword(email);

        if (!storedPassword) {
            return res.status(401).json({ 
                status: 'Documento o contraseña incorrecta'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, storedPassword);
        
        if (isPasswordValid) {
            const token = jwt.sign({ email:email }, secretKey, { expiresIn: '1h' }); 
            
            res.locals.token = token; 
            next(); 
        } else {
            return res.status(401).json({ 
                status: 'Documento o contraseña incorrecta'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            status: 'Error ocurrido al procesar la solicitud'
        });
    }
}

export default authMiddleware;
