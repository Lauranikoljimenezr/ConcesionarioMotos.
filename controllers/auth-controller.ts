// auth-controller.ts
import { Request, Response } from "express";
import UserService from "../services/UserServices";
import Auth from "../Dto/UserAuthenticationDto";
import {generateToken }from "../helpers/createToken"

const authController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const login = await UserService.auth(new Auth(email, password));
        if (login.logged) {
          
            return res.status(200).json({
                status: login.status,
                token:  await generateToken(email)
            });
        } else {
            return res.status(401).json({ 
                status: 'Incorrect username or password'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            status: 'Internal server error'
        });
    }
}

export default authController;
