import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';


const app = express();
app.use(express.json())
app.use(cookieParser());

app.use(cors())
const PORT = (process.env.PORT || 3000)

mongoose.connect(process.env.MONGO)
.then(()=>console.log("The database as been connected"))
.catch((err)=> console.log(err))


app.use( "/api/message",messageRouter)


app.listen(PORT , ()=>{
  console.log('This app is running on port' ,PORT)
});

