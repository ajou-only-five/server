import express from "express";
import TodoServices from "../services/todo.js"

var router = express.Router();

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try {
    const data = {
      itemId:parseInt(req.body.itemId)
    }
    let result = await TodoServices.findTodoItem(data)
    if(result.status){
      if(result.data.length===0){
        return res.status(400).json({
          message:"해당 itemId를 가진 todo item이 없습니다"
        })
      }
      else{
        return res.status(200).json({
          message:"해당 itemId를 가진 todo item이 있습니다",
          data:result.data
        })
      }
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.post("/", async function (req, res, next) {
  try {
    const data = {
      titleId:parseInt(req.body.titleId),
      content:req.body.content,
      startAt:parseInt(req.body.startAt),
      endAt:parseInt(req.body.endAt)
    }
    let result = await TodoServices.createTodoItem(data)
    if(result.status){
      return res.status(200).json({
        message:"success to create todoItem",
        itemId:result.data.itemId
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
router.patch("/", async function (req, res, next) {
  try {
    const data = {
      content:req.body.content,
      startAt:parseInt(req.body.startAt),
      endAt:parseInt(req.body.endAt),
      isChecked:parseInt(req.body.isChecked),
      itemId:parseInt(req.body.itemId)
    }
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
    const data = {
      itemId:parseInt(req.body.itemId)
    }
    let result = await TodoServices.deleteTodoItem(data)
    if(result.status){
      return res.status(200).json({
        message:"success to delete todoItem"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to delete todoItem(db error)"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
export {router as todoItemRouter}