import SearchServices from "../services/search.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    // 친구 목록
    searchFriend: async (req, res, next) => {
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
        const data = {
            ...req.params
        };
        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }

        data.userId = parseInt(data.userId);

        // only userId
        if (data.start === undefined) {


            // without nickname 
            if (data.nickname === undefined) {
                try {
                    const result = await SearchServices.searchFriendByUserId(data);

                    if (result.status) {
                        return res.status(200).send(result.data);
                    }

                    return res.status(500).send("Server error.");
                } catch (e) {
                    return res.status(500).send("Server error");
                }
            }

            if (!TypeChecker.isInteger(data.nickname)) {
                return res.status(400).send("nickname must be string.");
            }

            // with nickname
            try {
                const result = await SearchServices.searchFriendByUserIdAndNickname(data);

                if (result.status) {
                    return res.status(200).send(result.data);
                }

                return res.status(500).send("Server error.");
            } catch (e) {
                return res.status(500).send("Server error");
            }
        }

        if (!TypeChecker.isInteger(data.start)) {
            return res.status(400).send("start must be integer.");
        }
        if (data.end === undefined) {
            return res.status(400).send("end must be required.");
        }
        if (!TypeChecker.isInteger(data.end)) {
            return res.status(400).send("end must be integer.");
        }

        data.start = parseInt(data.start);
        data.end = parseInt(data.end);

        // between start and end without nickname 
        if (data.nickname === undefined) {
            try {
                const result = await SearchServices.searchFriendByUserIdBetween(data);

                if (result.status) {
                    return res.status(200).send(result.data);
                }

                return res.status(500).send("Server error.");
            } catch (e) {
                return res.status(500).send("Server error");
            }
        }
        if (!TypeChecker.isString(data.nickname)) {
            return res.status(400).send("nickname must be string.");
        }

        try {
            const result = await SearchServices.searchFriendByUserIdAndNicknameBetween(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    // 요청 받은 친구 목록
    searchFriendRequsted: async (req, res, next) => {
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
        const data = {
            ...req.params
        };
        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }

        data.userId = parseInt(data.userId);

        // only userId
        if (data.start === undefined) {
            if (data.nickname === undefined) {
                // without nickname
                try {
                    const result = await SearchServices.searchFriendRequestedByUserId(data);

                    if (result.status) {
                        return res.status(200).send(result.data);
                    }

                    return res.status(500).send("Server error.");
                } catch (e) {
                    return res.status(500).send("Server error");
                }
            }

            if (!TypeChecker.isString(data.nickname)) {
                return res.status(400).send("nickname must be string.");
            }

            // with nickname
            try {
                const result = await SearchServices.searchFriendRequestedByUserIdAndNickname(data);

                if (result.status) {
                    return res.status(200).send(result.data);
                }

                return res.status(500).send("Server error.");
            } catch (e) {
                return res.status(500).send("Server error");
            }
        }

        if (!TypeChecker.isInteger(data.start)) {
            return res.status(400).send("start must be integer.");
        }
        if (data.end === undefined) {
            return res.status(400).send("end must be required.");
        }
        if (!TypeChecker.isInteger(data.end)) {
            return res.status(400).send("end must be integer.");
        }

        data.start = parseInt(data.start);
        data.end = parseInt(data.end);

        // between start and end without nickname 
        if (data.nickname === undefined) {
            try {
                const result = await SearchServices.searchFriendRequestedByUserIdBetween(data);

                if (result.status) {
                    return res.status(200).send(result.data);
                }

                return res.status(500).send("Server error.");
            } catch (e) {
                return res.status(500).send("Server error");
            }
        }
        if (!TypeChecker.isString(data.nickname)) {
            return res.status(400).send("nickname must be string.");
        }

        try {
            const result = await SearchServices.searchFriendRequestedByUserIdAndNicknameBetween(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
    searchNotFriend: async (req, res, next) => {
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
        const data = {
            ...req.params
        };
        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }

        data.userId = parseInt(data.userId);

        // only userId
        if (data.start === undefined) {
            if (data.nickname === undefined) {
                // without nickname
                try {
                    const result = await SearchServices.searchNotFriendByUserId(data);

                    if (result.status) {
                        return res.status(200).send(result.data);
                    }

                    return res.status(500).send("Server error.");
                } catch (e) {
                    return res.status(500).send("Server error");
                }
            }

            if (!TypeChecker.isString(data.nickname)) {
                return res.status(400).send("nickname must be string.");
            }

            // with nickname
            try {
                const result = await SearchServices.searchNotFriendByUserIdAndNickname(data);

                if (result.status) {
                    return res.status(200).send(result.data);
                }

                return res.status(500).send("Server error.");
            } catch (e) {
                return res.status(500).send("Server error");
            }
        }

        if (!TypeChecker.isInteger(data.start)) {
            return res.status(400).send("start must be integer.");
        }
        if (data.end === undefined) {
            return res.status(400).send("end must be required.");
        }
        if (!TypeChecker.isInteger(data.end)) {
            return res.status(400).send("end must be integer.");
        }

        data.start = parseInt(data.start);
        data.end = parseInt(data.end);

        // between start and end without nickname 
        if (data.nickname === undefined) {
            try {
                const result = await SearchServices.searchNotFriendByUserIdBetweenStartAndEnd(data);

                if (result.status) {
                    return res.status(200).send(result.data);
                }

                return res.status(500).send("Server error.");
            } catch (e) {
                return res.status(500).send("Server error");
            }
        }
        if (!TypeChecker.isString(data.nickname)) {
            return res.status(400).send("nickname must be string.");
        }

        try {
            const result = await SearchServices.searchNotFriendByUserIdAndNicknameBetweenStartAndEnd(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    },
});