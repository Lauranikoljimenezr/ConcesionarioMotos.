import express from "express";
import registerController from '../controllers/register-controller';
import inventarioController from "../controllers/inventarioController";
const router = express.Router();


router.post('/', registerController, inventarioController.getInventario);


export default router;