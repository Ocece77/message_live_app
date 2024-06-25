import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv/config';
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';


const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "https://message-live-app-client.onrender.com" }));
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      connectSrc: ["'self'", "https://message-live-app.onrender.com"],
      imgSrc: ["'self'"],
      scriptSrc: ["'self'"]
    },
  })
);


mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("The database has been connected"))
  .catch((err) => console.log(err));


app.use("/api/message", messageRouter);

app.listen(PORT, () => {
  console.log('This app is running on port', PORT);
});
