import dotenv from 'dotenv';
dotenv.config({path:"../.env"})

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());



mongoose.connect(process.env.MONGO)
  .then(() => console.log("The database has been connected"))
  .catch((err) => console.log(err));

 app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log('This app is running on port', PORT);
});
