import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const teacherSchema = new mongoose.Schema({
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

teacherSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
}

teacherSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

teacherSchema.statics.hashPassword = async function (password) {
    return await hash(password, 8);
}

const teacherModel = mongoose.model('Teacher', teacherSchema);

export default teacherModel;