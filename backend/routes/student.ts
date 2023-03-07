import express from 'express';
const router = express.Router();
import * as student from '../services/student';

router.post('/enter', student.studentEnter);

router.post('/feedback', student.feedback);

router.post('/resend/testlink', student.resendMail);

router.post('/correct/answers', student.correctAnswers);

router.post('/answersheet', student.answerSheet);

router.post('/flags', student.flags);

router.post('/details', student.studentDetails);

router.post('/paper/questions', student.testQuestions);

router.post('/chosen/options', student.chosenOptions);

router.post('/update/answer', student.updateAnswers);

router.post('/end/test', student.endTest);

router.post('/get/question', student.getQuestion);

router.post('/feedback/status', student.checkFeedback);

export const studentRouter = router;
