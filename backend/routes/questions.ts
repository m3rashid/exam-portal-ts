import express from 'express';
const router = express.Router();
import * as teacher from '../services/teacher';

router.post('/create', teacher.createQuestion);

router.post('/details/all', teacher.getAllQuestions);

router.get('/details/:_id', teacher.getSingleQuestion);

router.post('/delete', teacher.deleteQuestion);

export const teacherRouter = router;
