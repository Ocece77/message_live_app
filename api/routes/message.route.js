import express from "express";
import {  getMessage ,postMessage} from "../controllers/message.controller.js";


const messageRouter = express.Router()

messageRouter.get('/get' , getMessage)
messageRouter.post('/post' , postMessage)

export default messageRouter;