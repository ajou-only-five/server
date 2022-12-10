import OnlyFiveServices from "../services/onlyFive.js";
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    searchOnlyFiveByUserId: async (req, res, next) => {
        const data = {
            ...req.body
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
                return res.status(200).send(result.data);
            }

            return res.status(500).send("Server error.");
        } catch (e) {
            return res.status(500).send("Server error");
        }
    }
});