import express from "express";

import { FollowController } from '../controllers/index.js';

const router = express.Router();

router.all('/', (req, res, next) => {
    if(!req.session.userId){
        return res.status(400).send("session is invalid")
    }
    
    next();
});

router.post('/', FollowController.createFollow);

router.delete('/', FollowController.deleteFriend);

export default router;