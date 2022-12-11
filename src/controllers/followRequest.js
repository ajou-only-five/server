import FollowRequestServices from "../services/followRequest.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    createFollowRequest: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.userId === undefined) {
            console.log('createFollowRequest userId must be required.')
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            console.log('createFollowRequest requesteeId must be integer.')
            return res.status(400).send("userId must be integer.");
        }
        if (data.requesteeId === undefined) {
            console.log('createFollowRequest requesteeId must be required.')
            return res.status(400).send("requesteeId must be required.");
        }
        if (!TypeChecker.isInteger(data.requesteeId)) {
            console.log('createFollowRequest requesteeId must be required.')
            return res.status(400).send("requesteeId must be integer.");
        }

        data.userId = parseInt(data.userId);
        data.requesteeId = parseInt(data.requesteeId);

        try {
            const result = await FollowRequestServices.createFollowRequest(data);
            

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
        if (data.requesteeId === undefined) {
            return res.status(400).send("requesteeId must be required.");
        }
        if (!TypeChecker.isInteger(data.requesteeId)) {
            return res.status(400).send("requesteeId must be integer.");
        }

        data.userId = parseInt(data.userId);
        data.requesteeId = parseInt(data.requesteeId);

        try {
            const result = await FollowRequestServices.deleteFollowRequest(data);

            if (result.status) {
                // 삭제된 row가 없을 때
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    deleteFollowRequested: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.requesterId === undefined) {
            return res.status(400).send("requesterId must be required.");
        }
        if (!TypeChecker.isInteger(data.requesterId)) {
            return res.status(400).send("requesterId must be string.");
        }

        data.userId = parseInt(data.userId);
        data.requesterId = parseInt(data.requesterId);

        try {
            const result = await FollowRequestServices.deleteFollowRequested(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
});