import express from 'express';
const router = express.Router();

import * as subjects from '../services/subjects';

router.post('/create', subjects.createEditsubject);

router.get('/details/all', subjects.getAllSubjects);

router.get('/details/:_id', subjects.getSingleSubject);

export const subjectsRouter = router;
