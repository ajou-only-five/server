import express from "express";

import { FollowRequestController } from '../controllers/index.js';

const router = express.Router();

router.post('/', FollowRequestController.createFollowRequest);

router.delete('/request', FollowRequestController.deleteFollowRequest);
router.delete('/requested', FollowRequestController.deleteFollowRequested);

export default router;