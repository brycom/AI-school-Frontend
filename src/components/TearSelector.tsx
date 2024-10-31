import { useEffect, useState } from "react";
import"./css/TearSelector.css";
import TearCard from './tearSubComponents/TearCard'
import Logout from "./Logout";
import { Link } from "react-router-dom";

interface Tear {
  id: string;
  descripiton: string;
  priceId: string;
  tear: string;
  price: number;
 
}

interface Props{
 url: string;
}

export default function TearSelector(props:Props) {
  const [tears, setTears] = useState<Tear[]|undefined>()


  useEffect(() => {
    fetch(props.url+"/tear/allTears",{
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then((data)=>{
      setTears(data);
    })
  }, []);



  return (

    <>
          <div className='buttons'>
    <Logout url={props.url}></Logout>
    <Link to={"/topic-selector"}>
    <button>Nytt ämne</button>
    </Link>
      </div>
    <div className='tearcard-wrapper'>
        {
          tears?.map((tear,tearsIndex)=>{
            return <TearCard url={props.url} key={tearsIndex} tear={tear} />
          })
        }
{/*         <TearCard></TearCard>
        <TearCard></TearCard>
        <TearCard></TearCard> */}

      
    </div>
    </>
  )
}
