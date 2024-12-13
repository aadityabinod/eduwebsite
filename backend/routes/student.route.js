import {Router} from 'express';
import {registerStudent, loginStudent, logoutStudent, getStudentProfile} from '../controllers/student.controller.js';
import { authStudent,authTeacher  } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerStudent);

router.post('/login', loginStudent);

router.post('/logout', authStudent, logoutStudent);

router.get('/profile', authStudent, getStudentProfile);

export default router;