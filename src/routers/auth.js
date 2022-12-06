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

router.post("/sign-up", async function (req, res, next) { //회원가입
  const data = [
    req.body.accountName,
    req.body.password,
    req.body.nickname,
    "default",
    0,
  ];
  try{
    let result = await UserServices.createUser(data);
    if(result.status){
      return res.status(200).json({message:"회원가입 성공"})
    }
    else{
      return res.status(400).json({
        message:"회원가입 실패"
      })
    }
  }catch(err){
    return res.status(500).json({
      message:"server error"
    })
  }
  
});
router.post("/login", async function (req, res, next) {
  const data=[
    req.body.accountName,
  ]
  try{
    let result = await UserServices.findUserByAccount(data)
    if(result.status){//정보가 있으면 세션에 저장.
      if(result.data.length===0){
        return res.status(400).json({
          message:"해당 account를 가진 user가 없습니다."
        })
      }
      if(result.data[2]!==req.body.password){
        return res.status(400).json({
          message:"비밀번호가 틀립니다.",
        })
      }
      req.session.account=req.body.accountName;
      req.session.password=req.body.password;
      req.session.userId=result.data[0];
      return res.status(200).json({
        message:"로그인 성공"
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
  
});
router.post("/logout", async function (req, res, next) {
  try{
    if(req.session.account){ //세션 정보가 있으면 세션을 삭제해줌
      await req.session.destroy(function(err){
        if(err){
          return res.status(400).json({message:"로그아웃 실패(seesion delete error)"});
        }
        else{
          return res.status(200).json({message:"로그아웃 성공"})
        }
      })
    }
  }catch(err){
    res.status(400).json({
      message:"로그아웃 실패(seesion delete error)"
    })
  }
})
export {router as authRouter}
