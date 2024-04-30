import { Request, Response } from "express";
import authMiddleware from '../Middleware/authMiddleware';

const authController = (req: Request, res: Response) => {

    authMiddleware(req, res, () => {
        const token = res.locals.token; 

        return res.status(200).json({ 
            status: 'Autenticación exitosa',
            token: token 
        });
    });
}

export default authController;
