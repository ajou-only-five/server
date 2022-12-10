import express from "express";
import { ValidController } from '../controllers/index.js';

var router = express.Router();

router.post("/account/exists",ValidController.checkAccountExist)

router.post("/nickname/exists",ValidController.checkNicknameExist)

export {router as validRouter}