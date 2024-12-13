import { compare } from 'bcryptjs';
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

teacherSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
}

teacherModel.methods.comparePassword = async function (password) {
    return await compare(password, this.password);
}

teacherModel.statics.hashPassword = async function (password) {
    return await hash(password, 8);
}

const teacherModel = model('Teacher', teacherSchema);

export default teacherModel;