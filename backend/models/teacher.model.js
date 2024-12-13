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

teacherSchema.pre('save', async function(next){
   if(this.isModified('password')){
       this.password = await bcrypt.hash(this.password, 8);
   }
   next();
})

teacherSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '2h'});
}



const teacherModel = model('Teacher', teacherSchema);

export default teacherModel;