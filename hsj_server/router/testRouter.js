import express from "express";
import "express-async-errors";

import * as testController from "../controller/testController.js";

const router = express.Router();

// router.get('/posts?sort=["title","ASC"]&range=[0, 24]&filter={"title":"bar"}' , testController.getList);
router.get("/posts", testController.getList);

router.get("/posts/:id", testController.getOne);

//  controller에서 getList랑 하나로 합쳐져있음  ,구분 필요
router.get("/posts?filter=", testController.getMany);

// author_id 가 없어서 임시로 id로 받음
router.get('/posts/:id' , testController.getManyReference);

// 생성 ㅇㅋ
router.post('/posts' , testController.create);

// 
router.put('/posts/:id' , testController.update);


router.delete('/posts/:id' , testController.remove);

/* 

router.put('/posts?filter={"id":[123,124,125]}' , testController.updateMany);





router.delete('/posts?filter={"id":[123,124,125]}' , testController.removeMany);
 */

export default router;
