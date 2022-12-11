import express from "express";
import { MyInfoController } from '../controllers/index.js';

var router = express.Router();

router.all('/', (req, res, next) => {
    if(!req.session.userId){
        return res.status(400).send("session is invalid")
    }
    next();
});

router.get("/",MyInfoController.lookUpMyInfo)
router.patch("/disclosure",MyInfoController.updateDisclosure)
router.patch("/password",MyInfoController.updatePassword)
router.patch("/nickname", MyInfoController.updateNickname)
router.patch("/profile",MyInfoController.updateProfile)
export default router