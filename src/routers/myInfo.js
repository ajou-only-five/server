import express from "express";
import UserServices from '../services/user.js';

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    if(!req.session.account){
      return res.status(400).json({
        message:"session 기한이 만료되었습니다."
      })
    }
    let data = {
      account:req.session.account
    }
    let result = await UserServices.findUserByAccount(data)
    if(result.status){
      if(result.data.length===0){
        return res.status(400).json({
          message:"해당 session의 account를 가진 user가 없습니다"
        })
      }
      else{
        return res.status(200).json({
          message:"해당 session의 account를 가진 user가 았습니다",
          data:result.data
        })
      }
    }
    else{
      return res.status(500).json({
        message:"db error"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.patch("/disclosure", async function (req, res, next) {
  try {
    if(!req.session.account){
      return res.status(400).json({
        message:"session 기한이 만료되었습니다."
      })
    }
    let data = {
      account:req.session.account,
      disclosure:parseInt(req.body.disclosure)
    }
    let result = await UserServices.updateDisclosureByAccount(data)
    if(result.status){
      return res.status(200).json({
        message:"success to update disclosure"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to update disclosure (db error)"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.patch("/password", async function (req, res, next) {
  try {
    if(!req.session.account){
      return res.status(400).json({
        message:"session 기한이 만료되었습니다."
      })
    }
    let data = {
      account:req.session.account,
      password:req.body.password
    }
    let result = await UserServices.updatePasswordByAccount(data)
    if(result.status){
      return res.status(200).json({
        message:"success to update password"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to update password (db error)"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.patch("/nickname", async function (req, res, next) {
  try {
    if(!req.session.account){
      return res.status(400).json({
        message:"session 기한이 만료되었습니다."
      })
    }
    let data = {
      account:req.session.account,
      nickname:req.body.nickname
    }
    let result = await UserServices.updateNicknameByAccount(data)
    if(result.status){
      return res.status(200).json({
        message:"success to update nickname"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to update nickname (db error)"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.patch("/profile", async function (req, res, next) {
  try {
    if(!req.session.account){
      return res.status(400).json({
        message:"session 기한이 만료되었습니다."
      })
    }
    let data = {
      account:req.session.account,
      profile:req.body.profile
    }
    let result = await UserServices.updateProfileByAccount(data)
    if(result.status){
      return res.status(200).json({
        message:"success to update profile"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to update profile (db error)"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
export {router as myInfoRouter}