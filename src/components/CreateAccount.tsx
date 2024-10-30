import { Link, useNavigate } from "react-router-dom"
import "./css/CreateAccount.css"
import { useState } from "react";


interface Props{
  url:string
}

export default function CreateAccount(props:Props) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  function createNewAccount(){

    fetch(props.url+"/auth/create-account",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          "username": username,
          "password": password,
          "email": email,
        }),  
        credentials: 'include'
      }).then(response => response.json())
      .then((data)=>{
        console.log(data);
        
        
          navigate("/login");
        
          
        
      }).catch(error =>{
        console.error("Error creating account:", error);
      })

  }
  return (
    <div>
              <Link to={"/"}>
        <button>Home</button>
        </Link>
        <h4 className="headline">Create a new account</h4>
      <form action="" className="new-account" onSubmit={(e)=>{
        e.preventDefault();
        createNewAccount()

      }}>
        <input className="new-account-input" type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
        <input className="new-account-input" type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <input className="new-account-input" type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input className="new-account-input" id="submit-btn" type="submit" value="Sign Up" />
      </form>
      <p>Already have an account? <Link to={"/login"}> Sign in</Link></p>
      
    </div>
  )
}
