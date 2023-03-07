const router = express.Router();

import * as admin from '../services/admin';

router.post('/trainer/create', admin.teacherRegister);

router.get('/trainer/details/all', admin.getAllTeachers);

router.get('/trainer/details/:_id', admin.getSingleTeacher);

router.post('/trainer/remove', admin.removeTeacher);

export const adminRouter = router;
