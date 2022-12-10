import FollowRequestedServices from "../services/followRequest.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    createFollowRequest: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.requesteeId === undefined) {
            return res.status(400).send("requesteeId must be required.");
        }
        if (!TypeChecker.isInteger(data.requesteeId)) {
            return res.status(400).send("requesteeId must be string.");
        }

        data.userId = parseInt(data.userId);
        data.requesteeId = parseInt(data.requesteeId);

        try {
            const result = await FollowRequestedServices.createFollowRequest(data);
            

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    deleteFollowRequest: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.targetUserId === undefined) {
            return res.status(400).send("targetUserId must be required.");
        }
        if (!TypeChecker.isInteger(data.targetUserId)) {
            return res.status(400).send("targetUserId must be string.");
        }

        data.userId = parseInt(data.userId);
        data.targetUserId = parseInt(data.targetUserId);

        try {
            const result = await FollowRequestedServices.deleteFollowRequest(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
});