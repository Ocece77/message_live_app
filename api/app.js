import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import Message from './models/message.model.js'


const app = express();
const PORT = process.env.PORT || 3000


app.use(express.json());// extraire le corps JSON

mongoose.connect(process.env.MONGO)
.then(()=>{
  console.log("connexion à mongodb réussi");
})
.catch((err)=>console.log("connexion à échoué", err))

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.post("/api/message", (req, res , next)=>{
  delete req.body.id
  const message = new Message({
    ...req.body
  })
  message.save()
  .then(()=>res.status(201).json({message: 'message créer'}))
  .catch(err => res.status(400).json({error}))
})


app.get("/api/message", (req, res, next)=>{
  Message.find()
  .then(messages =>{res.status(200).json({messages})})
  .catch(err => res.status(404).json({err}))
});

app.get('/api/message/:id',(req,res,next)=>{
  Message.findOne({_id : req.params.id})
  .then(message=> res.status(200).json({thing}))
  .catch(err => res.status(400).json({err})) 
})

app.put('/api/message/:id', (req, res, next)=>{
 Message.updateOne({_id: req.params.id}, {...req.body , _id : req.params.id})
 .then(message=> res.status(200).json({message:'message supprimé'}))
 .catch((err)=>res.status(400).json({err}))
})

app.delete('/api/message/:id', (res, res, next)=>{
  Message.delete({_id: req.params.id})
  .then(()=> res.status(200).json({message: 'message supprimer'}))
  .catch(()=>res.status(400).json({message:'erreur dans la suppression'}))
})

app.listen(PORT ,()=>{
  console.log('le serveur run sur le port' , PORT)
})

export default app