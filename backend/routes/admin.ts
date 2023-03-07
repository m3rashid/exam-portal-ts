import express from 'express';
const router = express.Router();

import * as admin from '../services/admin';

router.post('/teacher/create', admin.teacherRegister);

router.get('/teacher/details/all', admin.getAllTeachers);

router.get('/teacher/details/:_id', admin.getSingleTeacher);

router.post('/teacher/remove', admin.removeTeacher);

export const adminRouter = router;
