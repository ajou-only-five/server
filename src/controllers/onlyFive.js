import OnlyFiveServices from "../services/onlyFive.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    searchOnlyFiveByUserId: async (req, res, next) => {
        const data = {
            ...req.query
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }

        data.userId = parseInt(data.userId);

        try {
            const result = await OnlyFiveServices.searchOnlyFiveByUserId(data);


            if (result.status) {
                if (result.data.length === 0) {
                    const dummy = [
                        {
                            USER_ID: null,
                            FRIEND_ID: null,
                            ACCOUNT: null,
                            NICKNAME: "⭐️",
                            PROFILE: null,
                            DISCLOSURE: null,
                            ITEM_NUM: 100
                        },
                        {
                            USER_ID: null,
                            FRIEND_ID: null,
                            ACCOUNT: null,
                            NICKNAME: "I",
                            PROFILE: null,
                            DISCLOSURE: null,
                            ITEM_NUM: 80
                        },
                        {
                            USER_ID: null,
                            FRIEND_ID: null,
                            ACCOUNT: null,
                            NICKNAME: "V",
                            PROFILE: null,
                            DISCLOSURE: null,
                            ITEM_NUM: 65
                        },
                        {
                            USER_ID: null,
                            FRIEND_ID: null,
                            ACCOUNT: null,
                            NICKNAME: "F",
                            PROFILE: null,
                            DISCLOSURE: null,
                            ITEM_NUM: 30
                        },
                        {
                            USER_ID: null,
                            FRIEND_ID: null,
                            ACCOUNT: null,
                            NICKNAME: "E",
                            PROFILE: null,
                            DISCLOSURE: null,
                            ITEM_NUM: 20
                        }
                    ];
                    return res.status(200).send(dummy);
                }

                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    }
});