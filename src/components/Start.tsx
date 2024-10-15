import { useState } from "react"
import "./css/start.css"
import Login from "./Login";
import CreateAccount from "./CreateAccount";

export default function Start() {
    const [login, setLogin] = useState<boolean>(false);
    const [createAccount, setCreateAccount] = useState<boolean>(false);
  return (
    <div className='start-wraper'>
    
      {login ? 
            <Login></Login>
        :createAccount? <CreateAccount></CreateAccount>:<div className="inner-wraper"><h1 className='headline'>Join now!</h1>
        <button className='start-button' id='create-account'onClick={()=>setCreateAccount(true)}>Create account</button>
        <button className='start-button' id='sign-in' onClick={()=>{setLogin(true); console.log("Woggeli boggeli");
        }}>Sign in</button>
        </div>}


    

      
    </div>
  )
}
