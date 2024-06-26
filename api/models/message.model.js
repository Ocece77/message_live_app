import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
  username :{
    type:String, 
    required : true,
  },
  content:{
    type:String,
    required : true,
  },
  date :{
    type : String,
    required : true
  } ,
})

const Message = mongoose.model("Message" , messageSchema);
export default Message;