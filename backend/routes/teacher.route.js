import { authStudent,authTeacher  } from '../middlewares/auth.middleware.js';
import {Router} from 'express';
import {registerTeacher, loginTeacher, logoutTeacher, getTeacherProfile} from '../controllers/teacher.controller.js';

const router = Router();

router.post('/register', registerTeacher);

router.post('/login', loginTeacher);

router.post('/logout', authTeacher, logoutTeacher);

router.get('/profile', authTeacher, getTeacherProfile);