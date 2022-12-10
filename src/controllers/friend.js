import FriendServices from "../services/friend.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    createFriend: async (req, res, next) => {
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }

        const data = {
            ...req.body
        };

        if (data.userId_1 === undefined) {
            return res.status(400).send("userId_1 must be required.");
        }
        if (!TypeChecker.isInteger(data.userId_1)) {
            return res.status(400).send("userId_1 must be integer.");
        }
        if (data.userId_2 === undefined) {
            return res.status(400).send("userId_2 must be required.");
        }
        if (!TypeChecker.isInteger(data.userId_2)) {
            return res.status(400).send("userId_2 must be string.");
        }

        data.userId_1 = parseInt(data.userId_1);
        data.userId_2 = parseInt(data.userId_2);

        try {
            const result = await FriendServices.createFriend(data);
            

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    deleteFriend: async (req, res, next) => {
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }

        const data = {
            ...req.body
        };

        if (data.userId_1 === undefined) {
            return res.status(400).send("userId_1 must be required.");
        }
        if (!TypeChecker.isInteger(data.userId_1)) {
            return res.status(400).send("userId_1 must be integer.");
        }
        if (data.userId_2 === undefined) {
            return res.status(400).send("userId_2 must be required.");
        }
        if (!TypeChecker.isInteger(data.followeeId)) {
            return res.status(400).send("userId_2 must be string.");
        }

        data.followerId = parseInt(data.followerId);
        data.followeeId = parseInt(data.followeeId);

        try {
            const result = await FriendServices.deleteFriend(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
});