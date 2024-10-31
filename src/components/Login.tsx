
import { useState } from "react";
import "./css/Login.css"
import {Link, useNavigate } from "react-router-dom";

interface Props{
  url: string;
}



export default function Login(props:Props) {
  const [username, setUsername]= useState<string>("");
  const [password, setPassword]= useState<string>("");
  const navigate = useNavigate();



  function Login(username: string, password: string) {
    fetch(props.url + "/auth/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        credentials: 'include',
    })
    .then(response => {
        if (!response.ok) { 
            throw new Error('Network response was not ok ' + response.status);
        }
        return response.json();
    })
    .then((data) => {
      console.log(data);
      
        navigate("/topic-selector"); 
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Invalid credentials or server error"); 
    });
}


  return (
    <div>
        <Link to={"/"}>
        <button>Home</button>
        </Link>
        <h4 className="headline">Login</h4>
        <form className="login-form" onSubmit={(e)=>{
          e.preventDefault();
          Login(username,password)}}>
          <input className="login-form-input" type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
          <input className="login-form-input" type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          <button className="login-form-input" id="submit-btn" type="submit">Login</button>
        </form>
       
        <p>Don't have an account?  <Link to={"/signup"}>Sign up</Link></p>
      
    </div>
  )
}
