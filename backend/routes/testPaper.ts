import express from 'express';
const router = express.Router();
import * as testPaper from '../services/testPaper';

router.post('/new/name/check', testPaper.checkTestName);

router.post('/create', testPaper.createEditTest);

router.get('/details/:_id', testPaper.getSingletest);

router.post('/details/all', testPaper.getAlltests);

router.post('/delete', testPaper.deleteTest);

router.post('/basic/details', testPaper.basicTestdetails);

router.post('/questions', testPaper.getTestquestions);

router.post('/candidates', testPaper.getCandidates);

router.post('/begin', testPaper.beginTest);

router.post('/end', testPaper.endTest);

router.post('/trainer/details', testPaper.TestDetails);

router.post('/candidates/details', testPaper.getCandidateDetails);

router.post('/max/marks', testPaper.MM);

export const testPaperRouter = router;
