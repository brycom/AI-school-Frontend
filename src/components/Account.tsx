
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom'


interface Props{
  url: string;
 
}

interface Profile{
  username: string;
  email: string;
  name: string;
  subscription: string;
 
}

export default function Account(props:Props) {
  const [profile, setProfile] = useState<Profile|undefined>()

  useEffect(() => {
    fetch(props.url +"/account/profile",{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      setProfile(data);
    })
  }, []);


  return (
    <div>

       {/*  <h1>Account</h1> */}
        <Link to="/tear-selector">
        <button onClick={()=>{  }}>Välj ett abunumang</button>
        </Link>
       {profile && <div>
        <h2>{profile.username}</h2>
        <h5>Namn: {profile.name}</h5>
        <h5>Email: {profile.email}</h5>
        <h5>Nuvarande abunumang: {profile.subscription}</h5>
        
        
        </div>}

  
      
    </div>
  )
}
