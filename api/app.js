import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import "dotenv/config.js";
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import path from 'path';




const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL , 
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

app.listen(PORT, () => {
  console.log('This app is running on port', PORT);
});
