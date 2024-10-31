import { useNavigate } from "react-router-dom";

interface Props{
    url:string;
}
export default function Logout(props:Props) {

    const navigate = useNavigate();

    function logout(){
        fetch(props.url+"/auth/logout",
            {
                method:"GET",
                credentials: 'include'
            }
        ).then(
            response => {
                if(response.status === 200){
                    navigate("/login")
                }
            }

        )
    }
  return (
    <div>
        <button onClick={logout}>logga ut</button>
      
    </div>
  )
}
