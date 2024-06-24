import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";



const Navbar = ()=>{
return(
  <>
  <div className="grid grid-cols-2 justify-between p-10">

   <div>
    <h1 className="font-bold text-2xl text-blue-900">The Message App.</h1>
   </div>

    <div className=" font-light text-blue-950 flex  justify-end gap-x-10 ">
      <Link className="hover:text-blue-800 flex justify-center items-center  align-middle gap-x-2" target="_blank" to='https://github.com/Ocece77'>
      <FontAwesomeIcon icon={faGithub} style={{color: "#103166",}} />
        GitHub</Link>
    </div>

  </div>

  </>
)
}



export default Navbar;