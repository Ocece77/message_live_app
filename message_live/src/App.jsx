import { HashRouter , Route } from "react-router-dom"
import MessagePage from "./pages/MessagePage"
import Navbar from "./components/Navbar"
import Error from "./components/Error"

function App() {
  return (
    <>
    <Navbar/>
      <HashRouter>
        <Route path="/message_live" element={<MessagePage/>}/>
        <Route path="*" element={<Error/>}/> 
      </HashRouter>
    </>
  )
}

export default App;
