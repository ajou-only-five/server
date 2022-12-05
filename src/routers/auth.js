import express from "express";
import { oracleDbHelper } from "../db/index.js";
import session from "express-session";

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
  let result = await UserServices.createUser(data);
  if (result.status) {
    res.status(200).send("signed success");
  } else {
    res.status(500).send("server error");
  }
  return result;
});
router.post("/login", async function (req, res, next) {
  let result = await UserServices.findUserByAccount(req.body.accountName);
  if (result.status) {
    //정보가 있으면 세션에 저장.
    req.session.account = req.body.accountName;
    req.session.password = req.body.password;
    return res.status(200).json("true");
  } else {
    return res.status(500).json("일치하는 account가 없습니다.");
  }
});
router.post("/logout", async function (req, res, next) {
  if (req.session.account) {
    //세션 정보가 있으면 세션을 삭제해줌
    await req.session.destroy(function (err) {
      if (err) {
        return res.status(500).send(false);
      } else {
        return res.status(200).send(true);
      }
    });
  }
});
export { router as authRouter };
