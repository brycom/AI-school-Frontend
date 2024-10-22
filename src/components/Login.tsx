
import "./css/Login.css"
import { Link } from "react-router-dom";

export default function Login() {

  return (
    <div>
        <Link to={"/"}>
        <button>Home</button>
        </Link>
        <h4 className="headline">Login</h4>
        <form className="login-form">
          <input className="login-form-input" type="text" placeholder="Username" />
          <input className="login-form-input" type="password" placeholder="Password" />
          <button className="login-form-input" id="submit-btn" type="submit">Login</button>
        </form>
       
        <p>Don't have an account?  <Link to={"/signup"}>Sign up</Link></p>
      
    </div>
  )
}
