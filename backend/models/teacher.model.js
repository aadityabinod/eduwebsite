import { Schema, model } from 'mongoose';

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    subject: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
  
});

teacherSchema.methods

const teacherModel = model('Teacher', teacherSchema);

export default teacherModel;