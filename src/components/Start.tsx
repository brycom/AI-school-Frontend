
import { Link, useNavigate } from 'react-router-dom';
import "./css/start.css"
import { useEffect } from 'react';

interface Props{
  url: string;
}
export default function Start(props: Props) {

  const navigate = useNavigate();


  useEffect(() => {
    fetch(props.url+"/topic/check",{
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      if (response.status === 200) {
        navigate("/topic-selector");
      }
   })

  }, []);
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
