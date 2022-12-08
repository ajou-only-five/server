import express from "express";
import UserServices from '../services/user.js';

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("valid");
  next();
});
router.post("/account/exists",async function(req,res,next){
    
  const data = {account: req.body.account}

  try{
    let result = await UserServices.findUserByAccount(data)
    if(result.status){
      if(result.data.length===0){
        return res.status(200).json({
          message:"해당 acccount를 가진 user가 없습니다."
        })
      }
      return res.status(400).json({
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
  const data = {nickname: req.body.nickname}
    
  try{
    let result = await UserServices.findUserByNickname(data)
    if(result.status){
      if(!result.data.length){
        return res.status(200).json({
          message:"해당 acccount를 가진 user가 없습니다."
        })
      }
      return res.status(400).json({
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
      result:false,
      message:"server error"
    })
  }
})
export {router as validRouter}