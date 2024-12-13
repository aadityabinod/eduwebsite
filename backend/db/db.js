import mongoose from 'mongoose';

function connectToDB(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.log('Error connecting to database');
        console.log(error);
    });
}