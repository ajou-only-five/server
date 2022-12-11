import express from "express";

import { OnlyFiveController } from '../controllers/index.js';

const router = express.Router();

router.all('/', (req, res, next) => {
    if(!req.session.userId){
        return res.status(400).send("session is invalid")
    }
    next();
});

router.get('/', OnlyFiveController.searchOnlyFiveByUserId);

export default router;