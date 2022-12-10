import FollowServices from "../services/follow.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    createFollow: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.followerId === undefined) {
            return res.status(400).send("followerId must be required.");
        }
        if (!TypeChecker.isInteger(data.followerId)) {
            return res.status(400).send("followerId must be string.");
        }

        data.userId = parseInt(data.userId);
        data.followerId = parseInt(data.followerId);

        try {
            const result = await FollowServices.createFollow(data);
            

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    deleteFriend: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.friendId === undefined) {
            return res.status(400).send("friendId must be required.");
        }
        if (!TypeChecker.isInteger(data.friendId)) {
            return res.status(400).send("friendId must be string.");
        }

        data.userId = parseInt(data.userId);
        data.friendId = parseInt(data.friendId);

        try {
            const result = await FollowServices.deleteFriend(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
});