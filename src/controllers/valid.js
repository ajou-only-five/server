import UserServices from '../services/user.js';
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    checkAccountExist: async(req,res,next)=>{
        const data = {
            ...req.body
        };

        if (data.account === undefined) {
            return res.status(400).send("account must be required.");
        }
        if (!TypeChecker.isString(data.account)) {
            return res.status(400).send("account must be string.");
        }
        try{
            const result = await UserServices.findUserByAccount(data)
            if(result.status){
              if(result.data.length===0){
                return res.status(200).send("No user whose account is " + data.account)
              }
              return res.status(400).send("A user with that account already exists.")
            }
            else{
              return res.status(500).send("Server error.")
            }
          }catch(e){
            return res.status(500).send("Server error.")
          }
    },
    checkNicknameExist:async(req,res,next)=>{
        const data = {
            ...req.body
        };

        if (data.nickname === undefined) {
            return res.status(400).send("nickname must be required.");
        }
        if (!TypeChecker.isString(data.nickname)) {
            return res.status(400).send("nickname must be string.");
        }
        try{
            const result = await UserServices.findUserByNickname(data)
            if(result.status){
              if(result.data.length===0){
                return res.status(200).send("No user whose nickname is " + data.nickname)
              }
              return res.status(400).send("A user with that nickname already exists.")
            }
            else{
              return res.status(500).send("Server error.")
            }
          }catch(e){
            return res.status(500).send("Server error.")
          }
    }
})