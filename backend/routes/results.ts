import express from 'express';
const router = express.Router();
import * as results from '../services/results';

router.post('/results', results.generateResults);

export const resultsRouter = router;
