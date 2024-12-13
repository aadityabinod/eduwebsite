import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },

    grade: {
        type: String,
        required: true,
        trim: true
    },

});


studentSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
     
};
studentSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 8);
}



studentSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return token;
};

const studentModel = mongoose.model('Student', studentSchema);

export default studentModel;