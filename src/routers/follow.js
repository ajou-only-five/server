import express from "express";

import { FollowController } from '../controllers/index.js';

const router = express.Router();

router.post('/', FollowController.createFollow);

router.delete('/', FollowController.deleteFriend);

export default router;