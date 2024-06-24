import express from "express";
import Message from "../models/message.model.js";


export const postMessage = async (req, res, next) =>{
  delete req.body._id
  const newMessage = new Message ({
    ...req.body
  })
  
  try{
    await newMessage.save();
    res.json( 'message posted')
  } catch (err){
    next(err);
  }

}


export const getMessage = async (req, res, next) =>{
  try{
    const messages = await Message.find();
    res.status(200).json({messages})
  } catch (err){
    res.status(400).json({err})
  }
  next();
}

export const deleteMessage = async (req, res ,next)=>{
  await Message.deleteOne({id : req.params._id})
  .then(()=> res.status(201).json({message: 'message has been deleted'}))
  .catch((err)=> res.status(401).json({err}))
  next();
}