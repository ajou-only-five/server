import express from "express";
import session from "express-session";

import bcrypt from "bcrypt";

import UserServices from '../services/user.js';

var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("auth");
  next();
});

router.post("/sign-up", async function (req, res, next) { //회원가입
  const data = {
    account: req.body.account,
    password: req.body.password,
    nickname: req.body.nickname,
    profile: "default",
    disclosure: 0,
  };

  try {
    let result = await UserServices.createUser(data);

    if (result.status) {
      return res.status(200).json({
        message: "회원가입 성공",
        userId: result.data.userId
      })
    }
    else {
      return res.status(400).json({
        message: "회원가입 실패"
      })
    }
  } catch (err) {
    return res.status(500).json({
      message: "server error"
    })
  }

});
router.post("/login", async function (req, res, next) {
  const data = {
    account: req.body.account,
  };

  try {
    let result = await UserServices.findUserByAccount(data);

    if (result.status) {//정보가 있으면 세션에 저장.
      if (result.data.length === 0) {
        return res.status(400).json({
          message: "해당 account를 가진 user가 없습니다."
        })
      }

      if (!bcrypt.compareSync(req.body.password, result.data[0].PASSWORD)) {
        return res.status(400).json({
          message: "비밀번호가 틀립니다.",
        })
      }

      req.session.account = req.body.accountName;
      req.session.password = req.body.password;
      req.session.userId = result.data[0].ID;

      return res.status(200).json({
        userId: result.data[0].ID,
        account: result.data[0].ACCOUNT,
        nickname: result.data[0].NICKNAME,
        profile: result.data[0].PROFILE,
        disclosure: result.data[0].DISCLOSURE,
        message: "로그인 성공"
      })
    }
    else {
      return res.status(500).json({
        message: "db error"
      })
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "server error"
    })
  }

});
router.post("/logout", async function (req, res, next) {
  try {
    if (req.session.account) { //세션 정보가 있으면 세션을 삭제해줌
      await req.session.destroy(function (err) {
        if (err) {
          return res.status(400).json({ message: "로그아웃 실패(seesion delete error)" });
        }
        else {
          return res.status(200).json({ message: "로그아웃 성공" })
        }
      })
    }
  } catch (err) {
    res.status(400).json({
      message: "로그아웃 실패(seesion delete error)"
    })
  }
})
export { router as authRouter }


// DECLARE
// 	startAt Date := TO_DATE(CONCAT(CONCAT(EXTRACT(YEAR FROM SYSDATE), EXTRACT(MONTH FROM SYSDATE)), '01000000'), 'YYYYMMDDHH24MISS’);
// 	endAt Date := ADD_MONTHS(TO_DATE(CONCAT(CONCAT(EXTRACT(YEAR FROM SYSDATE), EXTRACT(MONTH FROM SYSDATE)), '01000000'), 'YYYYMMDDHH24MISS'), 1);
// 	BEGIN

// 	END;


// SELECT * 
// FROM TODO_TITLE
// WHERE USER_ID = FOLLOWER_ID
// OR FOLLOWEE_ID;

// SELECT COUNT(*)
// FROM TODO_ITEM TI,
// (
// 	SELECT id
// 	FROM TODO_TITLE,
//   (
//     SELECT follower_id, followee_id
//     FROM FOLLOW
//     WHERE follower_id = user_id
//     OR followee_id = user_id
//   )
// 	WHERE user_id = follower_id
// 	OR user_id = followee_id
// ) TT
// WHERE TI.title_id = TT.id
// AND START_AT BETWEEN startAt AND endAt
// OR END_AT BETWEEN startAt AND endAt;











// SELECT SYSDATE,
// TO_DATE(CONCAT(CONCAT(EXTRACT(YEAR FROM SYSDATE), EXTRACT(MONTH FROM SYSDATE)), '01000000'), 'YYYYMMDDHH24MISS'),
// ADD_MONTHS(TO_DATE(CONCAT(CONCAT(EXTRACT(YEAR FROM SYSDATE), EXTRACT(MONTH FROM SYSDATE)), '01000000'), 'YYYYMMDDHH24MISS'), 1)
// FROM DUAL;