import { Link } from "react-router-dom"
import "./css/CreateAccount.css"

export default function CreateAccount() {
  return (
    <div>
              <Link to={"/"}>
        <button>Home</button>
        </Link>
      <form action="" className="new-account">
        <h4 className="headline">Create a new account</h4>
        <input className="new-account-input" type="text" placeholder="Username" />
        <input className="new-account-input" type="password" placeholder="Password" />
        <input className="new-account-input" id="submit-btn" type="submit" value="Sign Up" />
      </form>
      <p>Already have an account? <Link to={"/login"}> Sign in</Link></p>
      
    </div>
  )
}
