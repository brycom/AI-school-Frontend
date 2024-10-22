import { useState } from "react"
import { Link, Route, Routes } from 'react-router-dom';
import "./css/start.css"
import Login from "./Login";
import CreateAccount from "./CreateAccount";

export default function Start() {
    const [login, setLogin] = useState<boolean>(false);
    const [createAccount, setCreateAccount] = useState<boolean>(false);
  return (
    <div className='start-wraper'>
<Link to={"/signup"}>
<button className='start-button' id='create-account'onClick={()=>setCreateAccount(true)}>Create account</button>
</Link>
<Link to={"/login"}>
        <button className='start-button' id='sign-in'>Sign in</button>
</Link>


        
    
{/*         
        <Routes>
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
        </Routes>  */}



    

      
    </div>
  )
}
