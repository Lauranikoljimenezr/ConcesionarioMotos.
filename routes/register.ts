import express from "express";
import registerController from '../controllers/register-Controller';
import inventarioController from "../controllers/inventario-Controller";
const router = express.Router();


router.post('/', registerController, inventarioController.getInventario);


export default router;