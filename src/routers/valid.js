import express from "express";
import { oracleDbHelper } from "../db/index.js";
import UserServices from '../services/user.js';

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("valid");
  next();
});
router.post("/accountName/exists",async function(req,res,next){
  const data = {
    accunt:req.body.accountName
  }
  try{
    let result = await UserServices.findUserByAccount(data)
    if(result.status){
      return res.status(200).json({
        result:true,
      })
    }
    else{
      return res.status(400).json({result:false})
    }
  }catch(err){
    return res.status(500).json({
      result:false,
      message:"DB error"
    })
  }
})
router.post("/nickname/exists",async function(req,res,next){
  const data = {
    nickname:req.body.nickname
  }
  try{
    let result = await UserServices.findUserByNickname(data)
    if(result.status){
      return res.status(200).json({
        result:true,
      })
    }
    else{
      return res.status(400).json({result:false})
    }
  }catch(err){
    return res.status(500).json({
      result:false,
      message:"DB error"
    })
  }
})
export {router as validRouter}