// authController.ts
import UserRepository from '../repositories/UserRepository.js';
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const auth = async (req: Request, res: Response) => {
    
    try {
        const { email, password }: { email: string; password: string } = req.body;

        const storedPassword = await UserRepository.getUserPassword(email);

        if (!storedPassword) {
            return res.status(401).json({ 
                status: 'Documento o contraseña incorrecta'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, storedPassword);
        
        if (isPasswordValid) {
            return res.status(200).json({ 
                status: 'Autenticación exitosa'
            });
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

export default auth;
