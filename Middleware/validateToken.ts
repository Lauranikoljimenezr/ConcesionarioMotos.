import e, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const headerToken = req.headers['authorization'];

    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        const bearerToken = headerToken.slice(7);

        await jwt.verify(bearerToken, process.env.SECRET_KEY || 'Laurappp', (err, decoden) => {
            if (err) {
                if(err instanceof jwt.TokenExpiredError || err instanceof jwt.TokenExpiredError){
                    return res.status(401).json({
                        status: "autorizacion denegada: token invalido"
                    }) 
                }
            }
            next();
            })
    } else {
        res.status(404).json({
            status: 'Acceso denegado: Token no proporcionado'
        });
    }
        
    } catch (error) {
        console.error("Error durante la validación del token:", error);  
        return res.status(401).json({ message: "Autorización fallida" });  
    }
}

export default validateToken;