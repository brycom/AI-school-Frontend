import "./css/CreateAccount.css"

export default function CreateAccount() {
  return (
    <div>
      <form action="" className="new-account">
        <h4 className="headline">Create a new account</h4>
        <input className="new-account-input" type="text" placeholder="Username" />
        <input className="new-account-input" type="password" placeholder="Password" />
        <input className="new-account-input" id="submit-btn" type="submit" value="Sign Up" />
      </form>
      <p>Already have an account? <a href="#">Log In</a></p>
    </div>
  )
}
