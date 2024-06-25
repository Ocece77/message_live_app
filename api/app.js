import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = (process.env.PORT || 3000)
app.use(cookieParser());

const corsOptions = {
  origin: "https://message-live-app-client.onrender.com", // frontend URI (ReactJS)
}

app.use(express.json())
app.use(cors(corsOptions))


mongoose.connect(process.env.MONGO)
.then(()=>console.log("The database as been connected"))
.catch((err)=> console.log(err))


app.use( "/api/message",messageRouter)


app.listen(PORT , ()=>{
  console.log('This app is running on port' ,PORT)
});

