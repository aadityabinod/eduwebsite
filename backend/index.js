import express from 'express'
import dotenv from "dotenv"
import cors from "cors"
import connectToDB from "./db/db.js"
import studentRoutes from "./routes/student.route.js"
import teacherRoutes from "./routes/teacher.route.js"

dotenv.config()
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/students", studentRoutes)
app.use("/teachers", teacherRoutes)

app.listen(port, () => {    
    console.log(`Server running on port ${port}`);
    connectToDB();
})

app.get('/',(req, res)=>{
    res.send('Hello ')
})