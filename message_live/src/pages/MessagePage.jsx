import { useEffect, useState } from "react";

const MessagePage =()=>{

  var d = new Date()
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0'); 
  var yyyy = d.getFullYear();

  d = mm + '/' + dd + '/' + yyyy;

  const [count , setCount] = useState(40);
  const [formData , setFormData] = useState({
    username : '',
    content : '',
    date : d
    }) 
  const handleChange =(e)=>{
    if (e.target.id == 'content'){
      setCount(40 - e.target.value.length)
    }
   setFormData({...formData,[e.target.id] : e.target.value})
  }

  const [messages , setMessages] = useState([])

  const handleSubmit= async (e)=>{
      e.preventDefault();
      try{
        const res = await fetch('https://message-live-app.onrender.com/api/message/post', {
          method : 'POST',
          headers : {'Content-Type'  : 'application/json' },
          body : JSON.stringify(formData)
        });
        if (!res.ok){
          console.error('Error in the creation of the message')
        } else {
          console.log('message created')
        }
      } catch(err){
        console.log(err)
      }
    }

  useEffect(()=>{

      try {
        fetch('https://message-live-app.onrender.com/api/message/get')
        .then(response => {
          if (!response.ok){
          console.error('Error in the retrievement of the message')
          } 
          return response.json()
        })
        .then(data => setMessages(data["messages"]))
        .catch(error => console.error('Error:', error));

      } catch (err){
        console.error(err)
      }

  })

  return(

    <>
    <div className=" lg:px-56 px-16 rounded h-4/6  ">

    <div className="p-4 bg-sky-950 w-full rounded-t-lg ">
      <h5 className="font-bold text-white">Messages</h5>
    </div>

    <div className="h-full flex-grow overflow-y-auto bg-white p-5 flex flex-col gap-y-4 justify-end">
       {
        messages.map((message, index)=>(
          <div key={index} className="bg-sky-950 p-2 text-white rounded w-fit h-fit text-end">
           <p className="text-sm mb-4 text-sky-300 flex justify-between items-center px-2 "> {message.username} </p>
          <p>{message.content}</p>
          <p className=" border-t mt-4 pt-2 text-sm text-sky-300 text-opacity-20 font-bold">{message.date}</p>
         </div>
        ))

       }

      </div>

    <form onSubmit={handleSubmit} id='messageForm' name='messageForm' className="px-6 grid grid-cols-4 bg-neutral-50 w-full rounded-b-lg p-2">
      <div className="col-span-3 ">     
      <input onChange={handleChange} name='username' id='username' minLength={1} maxLength={20} type="text" className=" w-full rounded-t border border-e-0 border-b-0 focus:outline-none focus:ring-sky-600 focus:ring-1  px-4 placeholder:text-neutral-300 text-sky-800" placeholder="Your username..."  required/>
      <input onChange={handleChange} name='content' id='content' minLength={1} maxLength={40} type="text" className="w-full rounded-b border border-e-0 focus:outline-none focus:ring-sky-600 focus:ring-1  px-4 placeholder:text-neutral-300 text-sky-800" placeholder="Your message..." required />
      </div>

      <input type="submit" value='send' className={`rounded-r bg-sky-600 p-2 ${count === 40 ? "cursor-not-allowed opacity-50" : ""}`} disabled={count === 40  } />

      <label className="col-span-full text-xs mt-2 text-red-500" htmlFor="messageInput">You have {count} characters left </label>
    </form>



    </div>

    </>
  )

}

export default MessagePage;