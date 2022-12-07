import express from "express";
import TodoServices from "../services/todo.js"
var router = express.Router();

/* GET users listing. */

router.get("/", async function (req, res, next) { //todoTitle nickname으로 목록 조회
  const data={
    titleId:parseInt(req.body.titleId)
  }
  try {
    let result = await TodoServices.findTodoTitle(data)
    if(result.status){
      if(result.data.length===0){
        return res.status(400).json({
          message:"해당 titleId를 가진 title이 없습니다."
        })
      }
      return res.status(200).json({
        message:"title 검색 성공",
        data:result.data
      })
    }
    else{
      return res.status(500).json({
        message:"db error"
      })
    }
  }catch (e) {
    res.status(500).json({
      message:"server error"});
  }
});

router.post("/", async function (req, res, next) {
  try {
    const data = {
      userId:parseInt(req.session.userId),
      title:req.body.title,
      color:req.body.color
    }
    let result = await TodoServices.createTodoTitle(data)
    if(result.status){
      return res.status(200).json({
        message:"success to create todoTitle",
        titleId:result.data.titleId
      })
    }
    else{
      return res.status(400).json({
        message:"fail to create todoTitle"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.patch("/", async function (req, res, next) {
  try {
    const data = {
      title:req.body.title,
      color:req.body.color,
      titleId:parseInt(req.body.titleId)
    }
    let result = await TodoServices.updateTodoTitleByTitleId(data)
    if(result.status){
      return res.status(200).json({
        message:"success to update todoTitle"
      })
    }
    else{
      return res.status(400).json({
        message:"fail to update todoTitle"
      })
    }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
router.delete("/", async function (req, res, next) {
  try {
   let data = {
      titleId:parseInt(req.body.titleId)
   }
   let result = await TodoServices.deleteTodoTitle(data)
   if(result.status){
    return res.status(200).json({
      message:"success to delete todoTitle"
    })
   }
   else{
    return res.status(500).json({
      message:"fail to delete todoTitle(db error)"
    })
   }
  } catch (e) {
    res.status(500).json({message:"server error"});
  }
});
export {router as todoTitleRouter}