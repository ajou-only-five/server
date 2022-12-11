import express from "express";
import { AuthController } from '../controllers/index.js';

const router = express.Router();

router.post('/login', AuthController.loginRequested);

router.post('/sign-up', AuthController.createUser);

router.post('/logout', AuthController.logoutRequested);

export default router;
