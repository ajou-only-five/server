import oracleDbHelper from '../db/index.js';
import FriendRequestedServices from "../services/friendRequest.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    createFriendRequest: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.followerId === undefined) {
            return res.status(400).send("followerId must be required.");
        }
        if (!TypeChecker.isInteger(data.followerId)) {
            return res.status(400).send("followerId must be integer.");
        }
        if (data.followeeId === undefined) {
            return res.status(400).send("followeeId must be required.");
        }
        if (!TypeChecker.isInteger(data.followeeId)) {
            return res.status(400).send("followeeId must be string.");
        }

        data.followerId = parseInt(data.followerId);
        data.followeeId = parseInt(data.followeeId);

        try {
            const result = await FriendRequestedServices.createFriendRequest(data);
            

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    deleteFriendRequest: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.followerId === undefined) {
            return res.status(400).send("followerId must be required.");
        }
        if (!TypeChecker.isInteger(data.followerId)) {
            return res.status(400).send("followerId must be integer.");
        }
        if (data.followeeId === undefined) {
            return res.status(400).send("followeeId must be required.");
        }
        if (!TypeChecker.isInteger(data.followeeId)) {
            return res.status(400).send("followeeId must be string.");
        }

        data.followerId = parseInt(data.followerId);
        data.followeeId = parseInt(data.followeeId);

        try {
            const result = await FriendRequestedServices.deleteFriendRequest(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
});