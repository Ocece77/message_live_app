import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", process.env.API_URL],
      imgSrc: ["'self'"],
      scriptSrc: ["'self'"]
    },
  })
);


mongoose.connect(process.env.MONGO)
  .then(() => console.log("The database has been connected"))
  .catch((err) => console.log(err));

 app.use("/api/message", messageRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../message_live/dist', 'index.html'));
});


app.listen(PORT, () => {
  console.log('This app is running on port', PORT);
});
