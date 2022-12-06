import express from "express";
import TodoTitleServices from '../services/todoTitle.js';

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) { //todoTitle nickname으로 목록 조회
  const data={
    nickname:req.body.nickname
  }
  try {
    let result = await TodoTitleServices.searchTodoTitleByNickname(data)
    if(result.status){ //찾았을 경우 배열로 데이터를 전달 
      if(result.data.length===0){
        return res.status(400).json({
          message:"해당 nickname의 todotitle이 없습니다."
        })
      }
      return res.status(200).json({
        data:result.data,
        message:"todoTitle을 찾았습니다"
      })
    }
    else{
      return res.status(500).json({
        message:"DB error",
      })
    }
  } catch (e) {
    res.status(500).json({
      message:"server error"});
  }
});
router.post("/", async function (req, res, next) {
  try {
    const data = {
      nickname:req.body.nickname,
      text:req.body.text,
      color:req.body.color
    }
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.put("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.update({
      table: "TODO_TITLE",
      columns: ["title", "color"],
      data: [req.body.nickname, req.body.TITLE, req.body.COLOR],
    });
    console.log(result);

    if (result.code === 200) {
      return res.status(200).send("user created succeed");
    }

    res.status(400).send("client error");
    // res.status(500).send('server error');
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.delete("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.delete({
      table: "TODO_TITLE",
      columns: ["title", "color"],
      data: [req.body.nickname, req.body.TITLE],
    });
    console.log(result);

    if (result.code === 200) {
      return res.status(200).send("user created succeed");
    }

    res.status(400).send("client error");
    // res.status(500).send('server error');
  } catch (e) {
    res.status(500).send("server error");
  }
});
export {router as todoTitleRouter}