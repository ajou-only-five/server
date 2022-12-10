import express from "express";

import { OnlyFiveController } from '../controllers/index.js';

const router = express.Router();

router.get('/', OnlyFiveController.searchOnlyFiveByUserId);

export default router;