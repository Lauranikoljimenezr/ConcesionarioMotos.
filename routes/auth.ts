import express from "express";
import authController from '../controllers/auth-controller';
import {validator, validatorParams } from "../Middleware/authValidator";

const router = express.Router();


router.post('/',  validatorParams, validator, authController);


export default router;
