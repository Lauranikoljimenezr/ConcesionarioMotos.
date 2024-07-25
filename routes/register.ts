import express from "express";
import registerController from '../controllers/register-controller';
import inventarioController from "../controllers/inventario-Controller";
import {validator, validatorParams } from "../Middleware/registerValidator";
const router = express.Router();


router.post('/', validatorParams, validator, registerController, inventarioController.getInventario);


export default router;