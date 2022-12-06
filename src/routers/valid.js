import express from "express";
import UserServices from '../services/user.js';

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("valid");
  next();
});
router.post("/accountName/exists",async function(req,res,next){
  const data = [
    req.body.accountName
  ]
  try{
    let result = await UserServices.findUserByAccount(data)
    if(result.status){
      if(result.data.length===0){
        res.status(400).json({
          message:"해당 acccount를 가진 user가 없습니다."
        })
      }
      return res.status(200).json({
        message:"해당 acoount를 가진 user가 존재합니다"
      })
    }
    else{
      return res.status(500).json({
        message:"db error"
      })
    }
  }catch(err){
    return res.status(500).json({
      message:"server error"
    })
  }
})
router.post("/nickname/exists",async function(req,res,next){
  const data = [
    req.body.nickname
  ]
  try{
    let result = await UserServices.findUserByNickname(data)
    if(result.status){
      return res.status(200).json({
        result:true,
      })
    }
    else{
      return res.status(500).json({
        message:"db error"
      })
    }
  }catch(err){
    return res.status(500).json({
      result:false,
      message:"server error"
    })
  }
})
export {router as validRouter}