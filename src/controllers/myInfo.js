import UserServices from '../services/user.js';
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    lookUpMyInfo: async (req, res, next) => {
        const data = {
            userId: req.session.userId
        };

        if (data.account === undefined) {
            return res.status(400).send("account must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("account must be string.");
        }

        data.userId = parseInt(data.userId);

        try {
            const result = await UserServices.findUserByUserId(data)
            if (result.status) {
                if (result.data.length === 0) {
                    return res.status(400).send("No user whose userId is " + data.userId)
                }
                return res.status(200).send(result.data)
            }

            return res.status(500).send("Server error.")
        } catch (e) {
            return res.status(500).send("Server error.")
        }
    },
    updateDisclosure: async (req, res, next) => {
        const data = {
            userId: req.session.userId,
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.disclosure === undefined) {
            return res.status(400).send("disclosure must be required.");
        }
        if (!TypeChecker.isInteger(data.disclosure)) {
            return res.status(400).send("disclosure must be integer.");
        }

        data.userId = parseInt(data.userId);
        data.disclosure = parseInt(data.disclosure);
        
        try {
            const result = await UserServices.updateDisclosureByUserId(data)
            if (result.status) {
                return res.status(200).send("Success to update disclosure.")
            }
            return res.status(500).send("Server error.")
        } catch (e) {
            return res.status(500).send("Sercer error.")
        }
    },
    updatePassword: async (req, res, next) => {
        const data = {
            userId: req.session.userId,
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be userId.");
        }
        if (data.password === undefined) {
            return res.status(400).send("password must be required.");
        }
        if (!TypeChecker.isString(data.password)) {
            return res.status(400).send("password must be string.");
        }

        data.userId = parseInt(data.userId);

        try {
            const result = await UserServices.updatePasswordByUserId(data)
            if (result.status) {
                return res.status(200).send("Success to update password.")
            }
            return res.status(500).send("Server error.")
        } catch (e) {
            return res.status(500).send("Sercer error.")
        }
    },
    updateNickname: async (req, res, next) => {
        const data = {
            userId: req.session.userId,
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be userId.");
        }
        if (data.nickname === undefined) {
            return res.status(400).send("nickname must be required.");
        }
        if (!TypeChecker.isString(data.nickname)) {
            return res.status(400).send("nickname must be string.");
        }

        data.userId = parseInt(data.userId);

        try {
            const result = await UserServices.updateNicknameByUserId(data)
            if (result.status) {
                return res.status(200).send("Success to update nickname.")
            }
            return res.status(500).send("Server error.")
        } catch (e) {
            return res.status(500).send("Sercer error.")
        }
    },
    updateProfile: async (req, res, next) => {
        const data = {
            userId: req.session.userId,
            ...req.body
        };

        if (data.userId === undefined) {
            return res.status(400).send("userId must be required.");
        }
        if (!TypeChecker.isInteger(data.userId)) {
            return res.status(400).send("userId must be integer.");
        }
        if (data.profile === undefined) {
            return res.status(400).send("profile must be required.");
        }
        if (!TypeChecker.isString(data.profile)) {
            return res.status(400).send("profile must be string.");
        }

        data.userId = parseInt(data.userId);
        
        try {
            const result = await UserServices.updateProfileByUserId(data)
            if (result.status) {
                return res.status(200).send("Success to update profile.")
            }
            return res.status(500).send("Server error.")
        } catch (e) {
            return res.status(500).send("Sercer error.")
        }
    },

})