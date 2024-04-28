import { Request, Response } from "express";
import authMiddleware from '../Middleware/authMiddleware';

const authController = (req: Request, res: Response) => {

    authMiddleware(req, res, () => {
       
        return res.status(200).json({ 
            status: 'Autenticación exitosa'
        });
    });
}

export default authController;
