import "../css/TearClard.css"

interface Tear {
  id: string;
  descripiton: string;
  priceId: string;
  tear: string;
  price:number;
 
}
interface Props{
  tear:Tear;
  url:string;
}
export default function TearCard(props:Props) {  

  function createPaymentSession(){
    fetch(props.url+"/stripe/payment",{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentId: props.tear.priceId
      })
    })
    .then(response => response.json())
    .then(data => {
      window.location.href = data.url;
      
    })
  }
  return (
    <div className='tear-card'>
        <h1 className="headline">{props.tear.tear}</h1>
        <h1 className="price">{props.tear.price}:-</h1>
        <p className="description">Med detta får du : {props.tear.descripiton}</p>
        <button className="buy-btn" onClick={()=>createPaymentSession()}>Start Learning</button>
        
        
  
      
    </div>
  )
}
