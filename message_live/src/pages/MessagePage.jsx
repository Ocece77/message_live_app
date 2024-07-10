import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFailed, fetchStart, fetchSuccess } from "../components/redux/messageSlice";


const MessagePage =()=>{
   
  const messageState = useSelector(state => state.message)
  const disptach = useDispatch()
  var d = new Date()
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0'); 
  var yyyy = d.getFullYear();

  d = mm + '/' + dd + '/' + yyyy;

  const [count , setCount] = useState(40);
  const form = useRef(null)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.API}/api/message/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error('Error in the creation of the message');
      } else {
        console.log('Message created');
        fetchMessages();
      }
    } catch (err) {
      console.log(err);
    }
    form.current.reset();
    setCount(40)
  };

  const controller = new AbortController();

  const fetchMessages = async () => {
    disptach(fetchStart())
    try {
      const res = await fetch(`${process.env.API}/api/message/get`,
        {signal : controller.signal}
      );
      if (!res.ok) {
        console.error('Error in the retrievement of the message');
      } else {
        const data = await res.json();
        setMessages(data.messages);
        disptach(fetchSuccess())
      }
    } catch (err) {
      console.error(err);
      disptach(fetchFailed())
    }
   
  };

  useEffect(() => {
    fetchMessages();
    return ()=>{
      controller.abort
    }
  }, []);


  return(

    <>
    <div className=" lg:px-56 px-16 rounded h-4/6  ">

    <div className="p-4 bg-sky-950 w-full rounded-t-lg ">
      <h5 className="font-bold text-white">Messages</h5>
    </div>
    <div className=" h-full overflow-scroll bg-white p-5 justify-end">
      <div className="flex flex-col gap-y-4 " >
 



      {messageState.fetch && <div role="status" className="flex flex-col w-full justify-center items-center ">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-sky-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <p className="text-sky-600">Please wait, the message is being recovered.</p>
        <span className="sr-only">Loading...</span>
    </div>}


    {messageState.error &&
        <p className="text-red-700 font-bold text-center">error in the request, please try again later or refresh the page</p>}



       

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
      </div>

    <form ref={form} onSubmit={handleSubmit} id='messageForm' name='messageForm' className="px-6 grid grid-cols-4 bg-neutral-50 w-full rounded-b-lg p-2">
      <div className="col-span-3 ">     
      <input onChange={handleChange} name='username' id='username' minLength={1} maxLength={20} type="text" className=" w-full rounded-t border border-e-0 border-b-0 focus:outline-none focus:ring-sky-600 focus:ring-1  px-4 placeholder:text-neutral-300 text-sky-800" placeholder="Your username..."  required/>
      <input onChange={handleChange} name='content' id='content' minLength={1} maxLength={40} type="text" className="w-full rounded-b border border-e-0 focus:outline-none focus:ring-sky-600 focus:ring-1  px-4 placeholder:text-neutral-300 text-sky-800" placeholder="Your message..." required />
      </div>

      <input type="submit" value='send' className={`text-white font-bolders rounded-r bg-sky-600 p-2 ${count === 40 ? "cursor-not-allowed opacity-50" : ""}`} disabled={count === 40  } />

      <label className="col-span-full text-xs mt-2 text-red-500" htmlFor="messageInput">You have {count} characters left </label>
    </form>
    </div>

    </>
  )

}

export default MessagePage;