import "./css/Login.css"

export default function Login() {
  return (
    <div>
        <form className="login-form">
        <h4 className="headline">Login</h4>
          <input className="login-form-input" type="text" placeholder="Username" />
          <input className="login-form-input" type="password" placeholder="Password" />
          <button className="login-form-input" id="submit-btn" type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      
    </div>
  )
}
