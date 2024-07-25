import { Request, Response } from "express";
import UserService from '../services/UserServices';
import User from '../Dto/UserDto';

const register = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
            name,
            lastName,
            phoneNumber,
            domicilio
        } = req.body;

        if (!password) {
            return res.status(400).send({ error: 'Password is required' });
        }

        await UserService.register(new User(email, name, lastName, phoneNumber, password, domicilio));
        return res.status(201).send({ status: 'register ok' });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(500).send({ errorInfo: error.sqlMessage });
        } else {
            return res.status(500).send({ error });
        }
    }
}

export default register;
