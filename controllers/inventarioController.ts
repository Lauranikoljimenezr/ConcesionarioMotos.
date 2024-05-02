// inventarioController.ts
import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';

const getInventario = async (req: Request, res: Response) => {
    try {
        const inventario = await UserRepository.getAllMotos(); 
        res.status(200).json({ inventario });
    } catch (error) {
        console.error('Error al obtener el inventario:', error);
        res.status(500).json({ error: 'Error al obtener el inventario' });
    }
};

export default { getInventario };
