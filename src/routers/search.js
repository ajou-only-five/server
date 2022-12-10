import express from "express";

import { SearchController } from '../controllers/index.js';

const router = express.Router();

router.get('/friend', SearchController.searchFriend);
router.get('/friendRequsted', SearchController.searchFriendRequsted);
router.get('/notFriend', SearchController.searchNotFriend);

export default router;