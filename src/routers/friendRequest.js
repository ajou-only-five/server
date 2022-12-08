import express from "express";

import { FriendRequestController } from '../controllers/index.js';

const router = express.Router();

router.post('/friendRequest', FriendRequestController.createFriendRequest);

router.delete('/friendRequest', FriendRequestController.deleteFriendRequest);

export default router;