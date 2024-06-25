import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import messageRouter from './routes/message.route.js';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());

// Configuration des options CORS
const corsOptions = {
  origin: "https://message-live-app-client.onrender.com", // URI du frontend (ReactJS)
};

app.use(express.json());
app.use(cors(corsOptions));

// Utilisation de Helmet pour la sécurité
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

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => console.log("The database has been connected"))
  .catch((err) => console.log(err));

// Routes de l'application
app.use("/api/message", messageRouter);

// Démarrage du serveur
app.listen(PORT, () => {
  console.log('This app is running on port', PORT);
});
