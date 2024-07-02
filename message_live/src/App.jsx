import { Routes , Route } from "react-router-dom"
import MessagePage from "./pages/MessagePage"
import Navbar from "./components/Navbar"
import Error from "./components/Error"

function App() {
  
  if (process.env.NODE_ENV === 'production' || import.meta.env.MODE === 'production') {
    if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
      for (let prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        if (Object.prototype.hasOwnProperty.call(window.__REACT_DEVTOOLS_GLOBAL_HOOK__, prop)) {
          window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = function() {};
        }
      }
    }
  }
  
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
