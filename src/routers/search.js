import express from "express";
import UserServices from '../services/user.js';

import { SearchController } from '../controllers/index.js';

const router = express.Router();

router.get('/friend', SearchController.searchFriend);
router.get('/friendRequsted', SearchController.searchFriendRequsted);

export default router;
