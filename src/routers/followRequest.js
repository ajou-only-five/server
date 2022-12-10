import express from "express";

import { FollowRequestController } from '../controllers/index.js';

const router = express.Router();

router.post('/', FollowRequestController.createFollowRequest);

router.delete('/', FollowRequestController.deleteFollowRequest);

export default router;