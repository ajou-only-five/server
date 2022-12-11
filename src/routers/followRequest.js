import express from "express";

import { FollowRequestController } from '../controllers/index.js';

const router = express.Router();

router.all('/*', (req, res, next) => {
    if(!req.session.userId){
        return res.status(400).send("session is invalid")
    }
    next();
});

router.post('/', FollowRequestController.createFollowRequest);

router.delete('/request', FollowRequestController.deleteFollowRequest);
router.delete('/requested', FollowRequestController.deleteFollowRequested);

export default router;