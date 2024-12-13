import studentModel from "../models/student.model";
import {validationResult} from 'express-validator';

async function createStudent({name, email, password, grade}){
     if(!name || !email || !password || !grade){
         throw new Error("All fields are required");
     }

     const student = await studentModel.create({
            name,
            email,
            password,
            grade
     })

     return student;
 }

 export const registerStudent = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()})
    }

    const {name, email, password, grade} = req.body;

    const isStudent = await studentModel.findOne({email});

    if(isStudent){
        return res.status(400).json({message:"Student already exists"})
    }

    const hashedPassword = await studentModel.hashPassword(password)

    const student = await createStudent({name, email, password:hashedPassword, grade});

    const token = student.generateAuthToken();
    res.status(201).json({student, token});
 }

 export const loginStudent = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body;

    const student = await studentModel.findOne({email});

    if(!student){
        return res.status(400).json({message:"Student does not exist"})
    }

    const isMatch = await student.comparePassword(password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"})
    }

    const token = student.generateAuthToken();
    res.status(200).json({student, token});
 }

 export const getStudentProfile = async(req, res, next)=>{
    res.status(200).json(req.student);
 }

 export const logoutStudent = async (req, res) => {
    res.clearCookie('token');
  

    res.status(200).json({ message: 'Logged out' });
 }