import UserServices from '../services/user.js';
import { TypeChecker } from '../utils/index.js';
import bcrypt from "bcrypt";

export default Object.freeze({
    createUser: async (req, res, next) => {
        const data = {
            ...req.body,
            profile: "default",
            disclosure: 0
        };
        if (data.account === undefined) {
            return res.status(400).send("account must be required.");
        }
        if (!TypeChecker.isString(data.account)) {
            return res.status(400).send("account must be string.");
        }
        if (data.password === undefined) {
            return res.status(400).send("password must be required.");
        }
        if (!TypeChecker.isString(data.password)) {
            return res.status(400).send("password must be string.");
        }
        if (data.nickname === undefined) {
            return res.status(400).send("nickname must be required.");
        }
        if (!TypeChecker.isString(data.nickname)) {
            return res.status(400).send("nickname must be string.");
        }

        try {
            const result = await UserServices.createUser(data);

            if (result.status) {
                return res.status(200).send(result.data);
            }
            return res.status(500).send("Server error.")
        } catch (e) {
            console.log(e);
            return res.status(500).send("Server error")
        }
    },
    loginRequested: async (req, res, next) => {
        const data = {
            ...req.body
        };

        if (data.account === undefined) {
            return res.status(400).send("account must be required.");
        }
        if (!TypeChecker.isString(data.account)) {
            return res.status(400).send("account must be string.");
        }
        if (data.password === undefined) {
            return res.status(400).send("password must be required.");
        }
        if (!TypeChecker.isString(data.password)) {
            return res.status(400).send("password must be string.");
        }

        try {
            let result = await UserServices.findUserByAccount(data);

            if (result.status) {//정보가 있으면 세션에 저장.
                if(result.data !== undefined){
                    if (!bcrypt.compareSync(data.password, result.data.PASSWORD)) {
                        return res.status(400).send("wrong password")
                    }

                    console.log(result.data);

                    req.session.userId = result.data.ID;
                    return await new Promise(async (resolve, reject) => {
                        await req.session.save(function(err) {
                            if(err) {
                                reject(res.status(400).send("No user whose account is " + data.account));
                            }

                            resolve(res.status(200).send("Success to login"));
                        });
                    });
                }
            }

            return res.status(500).send("Server error.")
        } catch (err) {
            console.log(err);
            return res.status(500).send("Server error.")
        }
    },
    logoutRequested: async (req, res, next) => {
        if (!req.session.userId) {
            return res.status(400).send("session is invalid")
        }

        try {
            await req.session.destroy(function (err) {
                if (err) {
                    return res.status(500).send("Fail to logout");
                }
                else {
                    return res.status(200).send("Success to logout.")
                }
            })
        } catch (err) {
            console.log(err);
            res.status(500).send("Server error.")
        }
    }
})
