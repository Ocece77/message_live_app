import { Routes , Route } from "react-router-dom"
import MessagePage from "./pages/MessagePage"
import Navbar from "./components/Navbar"
import Error from "./components/Error"

function App() {
  
 console.log('API URL:', process.env.API);

  
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<MessagePage/>}/>
        <Route path="*" element={<Error/>}/> 
      </Routes>
    </>
  )
}

export default App;
