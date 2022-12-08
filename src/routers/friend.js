import express from "express";

import { FriendController } from '../controllers/index.js';

const router = express.Router();

router.post('/friend', FriendController.createFriend);

router.delete('/friend', FriendController.deleteFriend);

export default router;