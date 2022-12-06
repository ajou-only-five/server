import express from "express";
import { oracleDbHelper } from "../db/index.js";
import session from "express-session";
import UserServices from '../services/user.js';

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("auth");
  next();
});

router.post("/sign-up", async function (req, res, next) {
  const data = {
    account: req.body.accountName,
    password: req.body.password,
    nickname: req.body.nickname,
    profile: "default",
    disclosure: 0,
  };
  try{
    let result = await UserServices.createUser(data);
    if(result.status){
      res.status(200).send({result:true})
    }
    else{
      res.status(400).send({
        result:false,
        message:"couldn't create user"
      })
    }
  }catch(err){
    return res.status(500).send({
      result:false,
      message:"DB error"
    })
  }
  
});
router.post("/login", async function (req, res, next) {
  const data={
    account:req.body.accountName,
  }
  try{
    let result = await UserServices.findUserByAccount(data)
    if(result.status){//정보가 있으면 세션에 저장.
      if(result.data[2]!==req.body.password){
        return res.status(400).json({
          result:false,
          message:"비밀번호가 틀립니다.",
        })
      }
      req.session.account=req.body.accountName;
      req.session.password=req.body.password;
      return res.status(200).json({result:true})
    }
    else{
      return res.status(400).json({
        result:false,
        message:"아이디가 존재하지 않습니다."
    })
  }
  }catch(err){
    return res.status(500).json({
      result:false,
      message:"DB error"
    })
  }
  
});
router.post("/logout", async function (req, res, next) {
  try{
    if(session.account){ //세션 정보가 있으면 세션을 삭제해줌
      await req.session.destroy(function(err){
        if(err){
          return res.status(500).send({result:false});
        }
        else{
          return res.status(200).json({result:true})
        }
      })
    }
  }catch(err){
    res.status(500).json({
      result:false,
      message:"Session delete error"
    })
  }
})
export {router as authRouter}
