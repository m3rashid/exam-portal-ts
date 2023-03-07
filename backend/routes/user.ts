import express from 'express';
import * as login from '../services/login';
import * as user from '../services/user';

const router = express.Router();

router.get('/details', user.userDetails);

router.post('/', login.userLogin);

export const userRouter = router;
