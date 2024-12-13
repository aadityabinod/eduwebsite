import teacherModel from "../models/teacher.model.js";
import { validationResult } from "express-validator";
import blacklistTokenModel from "../models/blacklistTokenmodel.js";  


async function createTeacher({email,password, name, subject}){
    if(!email || !password || !name || !subject){
        throw new Error("All fields are required");
    }

    const teacher = await teacherModel.create({
        email,
        password,
        name,
        subject
    })

    return teacher;
}

export const registerTeacher = async (req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errros: errors.array()})
    }

    const {name, email, password, subject} = req.body;

    const isTeacher = await teacherModel.findOne({email});

    if(isTeacher){
        return res.status(400).json({message:"Teacher already exists"})
    }

    const hashedPassword = await teacherModel.hashPassword(password);

    const teacher = await createTeacher({email, password:hashedPassword, name, subject});

    const token = teacher.generateAuthToken();
    res.status(201).json({teacher, token});
}

export const loginTeacher= async (req, res, next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    const teacher = await teacherModel.findOne({email});

    if(!teacher){
        return res.status(400).json({message:"Teacher does not exist"})
    }

    const isMatch = await teacher.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }
}

export const getTeacherProfile = async (req, res, next)=>{  
    res.status(200).json(req.teacher);
}

export const logoutTeacher = async (req, res, next)=>{  
    res.clearCookie("token");
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blacklistTokenModel.create({ token });
    res.status(200).json({message:"Logged out successfully"});
}