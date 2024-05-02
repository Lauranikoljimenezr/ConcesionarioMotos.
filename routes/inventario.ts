import express from "express";
import inventarioController from "../controllers/inventarioController";
import validateToken from "../Middleware/authMiddleware";

const router = express.Router();


router.get('/', validateToken, inventarioController.getInventario);

export default router;