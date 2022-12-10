import express from "express";
import { AuthController } from '../controllers/index.js';

const router = express.Router();

router.post('/login', AuthController.loginRequested);

router.post('/sing-up', AuthController.createUser);

router.post('/logout', AuthController.logoutRequested);

export {router as authRouter}
