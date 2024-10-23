
import { Link } from 'react-router-dom';
import "./css/start.css"

export default function Start() {
  return (
    <div className='start-wraper'>
<Link to={"/signup"}>
<button className='start-button' id='create-account'>Create account</button>
</Link>
<Link to={"/login"}>
        <button className='start-button' id='sign-in'>Sign in</button>
</Link>



    

      
    </div>
  )
}
