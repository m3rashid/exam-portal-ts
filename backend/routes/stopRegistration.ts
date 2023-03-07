import express from 'express';
const router = express.Router();
import * as registration from '../services/registrationLink';

router.post('/registration/stop', registration.stopRegistration);

router.post('/result/download', registration.download);

router.post('/get/feedbacks', registration.getFeedBack);

export const registrationRouter = router;
