import studentModel from '../models/student.model.js';
import jwt from 'jsonwebtoken';
import teacherModel from '../models/teacher.model.js';
import blacklistTokenmodel from '../models/blacklistTokenmodel.js';

async function authEntity(req,res, next, model){

    const token = req.cookies.token || req.headers.authorization?.split('')[1];

    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }

    const isBlackListed = await blacklistTokenmodel.findOne({token: token});
    if(isBlackListed){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const entity = await model.findbyId(decoded.id);
        if(!entity){
            return res.status(401).json({message: 'Unauthorized'});
        }

        req.entity = entity;
        return next(); 
    } catch (error) {
        console.error(err);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export function authStudent(req, res, next){
    return authEntity(req, res, next, studentModel);
}

export function authTeacher(req, res, next){
    return authEntity(req, res, next, teacherModel);
}   