import express from "express";
import UserServices from '../services/user.js';

import { SearchController } from '../controllers/index.js';

const router = express.Router();

router.all('/*', (req, res, next) => {
    console.log('search');
    console.log(req.session);
    console.log(req.sessionID);

    if(!req.session.userId){
        return res.status(400).send("session is invalid")
    }   

    next();
});

router.get('/friend', SearchController.searchFriend);
router.get('/friendRequested', SearchController.searchFriendRequested);
router.get('/notFriend', SearchController.searchNotFriend);

export default router;
