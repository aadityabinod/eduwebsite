import teacherModel from "../models/teacher.model";

async function createTeacher({name, email, password, subject}){
        if(!name || !email || !password || !subject){
            throw new Error("All fields are required");
        }

        const teacher = await teacherModel.create({
                name,
                email,
                password,
                subject
        })

        return teacher;
}