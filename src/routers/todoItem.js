import express from "express";
import TodoServices from "../services/todo.js"

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const result = await oracleDbHelper.search({
      table: "TODO_ITEM",
      columns: ["nickname", "title"],
      data: [req.body.nickname, req.body.title],
    });
    console.log(result);

    if (result.code === 200) {
      return res.status(200).send(result.data);
    }

    res.status(400).send("client error");
    // res.status(500).send('server error');
  } catch (e) {
    res.status(500).send("server error");
  }
});
router.post("/", async function (req, res, next) {
  try {
    const data = [
      req.body.titleId,
      req.body.content,
      req.body.startAt,
      req.body.endAt
    ]
    let result = await TodoServices.createTodoItem(data)
    if(result.status){
      return res.status(200).json({
        message:"success to create todoItem"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to create todoItem"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.put("/", async function (req, res, next) {
  try {
    const data = [
      req.body.content,
      req.body.startAt,
      req.body.endAt,
      req.body.isChecked,
      req.body.itemId
    ]
    let result = await TodoServices.updateTodoItemByItemId(data)
    if(result.status){
      return res.status(200).json({
        message:"success to update todoItem"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to update todoItem"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.delete("/", async function (req, res, next) {
  try {
    const data = [
      req.body.itemId
    ]
    let result = await TodoServices.deleteTodoItem(data)
    if(result.status){
      return res.status(200).json({
        message:"success to delete todoItem"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to delete todoItem"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
export {router as todoItemRouter}