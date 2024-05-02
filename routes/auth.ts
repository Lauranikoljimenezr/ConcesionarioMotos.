import express from "express";
import authController from '../controllers/auth-controller';
import authMiddleware from "../Middleware/authMiddleware";
const router = express.Router();


router.post('/', authController);


export default router;
