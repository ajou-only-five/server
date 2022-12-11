import UserServices from '../services/user.js';
import { TypeChecker } from '../utils/index.js';

export default Object.freeze({
    lookUpMyInfo: async(req,res,next)=>{
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
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
                 return res.status(400).send("No user whose account is " + data.account)
               }
                return res.status(200).send(result.data)
             }
             else{
               return res.status(500).send("Server error.")
            }
        }catch(e){
            return res.status(500).send("Server error.")
        }
    },
    updateDisclosure:async(req,res,next)=>{
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
        const data = {
            account:req.session.account,
            ...req.body
        };
        if (data.account === undefined) {
            return res.status(400).send("account must be required.");
        }
        if (!TypeChecker.isString(data.account)) {
            return res.status(400).send("account must be string.");
        }
        if (data.disclosure === undefined) {
            return res.status(400).send("disclosure must be required.");
        }
        if (!TypeChecker.isInteger(data.disclosure)) {
            return res.status(400).send("disclosure must be integer.");
        }
        data.disclosure = parseInt(data.disclosure);
        try{
            const result = await UserServices.updateDisclosureByAccount(data)
            if(result.status){
                return res.status(200).send("Success to update disclosure.")
            }
            return res.status(500).send("Server error.")
        }catch(e){
            return res.status(500).send("Sercer error.")
        }
    },
    updatePassword:async(req,res,next)=>{
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
        const data = {
            account:req.session.account,
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
        if (!TypeChecker.isInteger(data.password)) {
            return res.status(400).send("password must be string.");
        }
        try{
            const result = await UserServices.updatePasswordByAccount(data)
            if(result.status){
                return res.status(200).send("Success to update password.")
            }
            return res.status(500).send("Server error.")
        }catch(e){
            return res.status(500).send("Sercer error.")
        }
    },
    updateNickname:async(req,res,next)=>{
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
        const data = {
            account:req.session.account,
            ...req.body
        };
        if (data.account === undefined) {
            return res.status(400).send("account must be required.");
        }
        if (!TypeChecker.isString(data.account)) {
            return res.status(400).send("account must be string.");
        }
        if (data.nickname === undefined) {
            return res.status(400).send("nickname must be required.");
        }
        if (!TypeChecker.isString(data.nickname)) {
            return res.status(400).send("nickname must be string.");
        }
        data.nickname = parseInt(data.nickname);
        try{
            const result = await UserServices.updateNicknameByAccount(data)
            if(result.status){
                return res.status(200).send("Success to update nickname.")
            }
            return res.status(500).send("Server error.")
        }catch(e){
            return res.status(500).send("Sercer error.")
        }
    },
    updateProfile:async(req,res,next)=>{
        if(!req.session.account){
            return res.status(400).send("session is invalid")
        }
        const data = {
            account:req.session.account,
            ...req.body
        };
        if (data.account === undefined) {
            return res.status(400).send("account must be required.");
        }
        if (!TypeChecker.isString(data.account)) {
            return res.status(400).send("account must be string.");
        }
        if (data.profile === undefined) {
            return res.status(400).send("profile must be required.");
        }
        if (!TypeChecker.isString(data.profile)) {
            return res.status(400).send("profile must be string.");
        }
        try{
            const result = await UserServices.updateProfileByAccount(data)
            if(result.status){
                return res.status(200).send("Success to update profile.")
            }
            return res.status(500).send("Server error.")
        }catch(e){
            return res.status(500).send("Sercer error.")
        }
    },

})