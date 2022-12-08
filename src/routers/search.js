import express from "express";
import UserServices from '../services/user.js';

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    let data={
      nickname:req.body.nickname
    }
    let result = await UserServices.searchUserByNickname(data)
    if(result.status){
      if(result.data.length===0){
        return res.status(400).json({
          message:"해당 nickname을 가진 user가 없습니다"
        })
      }
      else{
        return res.status(200).json({
          message:"해당 nickname을 가진 user가 있습니다",
          data:result.data
        })
      }
    }
    else{
      return res.status(500).json({
        message:"db error"
      })
    }
  } catch (e){

    res.status(500).json({message:"server error"});
  }
});
router.get("/between",async function(req,res,next){
  try{
    let data={
      nickname:req.body.nickname,
      start:parseInt(req.body.start),
      end:parseInt(req.body.end)
    }
    let result = await UserServices.searchUserByNicknameBetween(data)
    if(result.status){
      if(result.data.length===0){
        return res.status(400).json({
          message:"해당 nickname을 가진 유저가 없습니다"
        })
      }
      else{
        return res.status(200).json({
          message:"해당 nickname을 가진 유저 중 "+data.start+" 부터 "+data.end+" 까지의 유저입니다",
          data:result.data
        })
      }
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
export {router as searchRouter}