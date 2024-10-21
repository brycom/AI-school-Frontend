import { SetStateAction, useEffect, useState} from 'react'

interface Props{
    question:string;
    setQuestion:React.Dispatch<React.SetStateAction<string>>;

}

interface Message{
    content: string;
    from: string;
}



export default function ChatWindow(props: Props) {
    const [answer, setAnswer] = useState<string>("");
    const[chat, setChat] = useState<Message[]>([]);
    
    
    
    useEffect(() => {
        fetch("http://localhost:8080/chat/question", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                teacher: {    
                    "name": "janne",
                    "description": "Du är en passionerad lärare som brinner för programmering"
                }, 
                topic: {
                    "topic": "programering",
                    "description": "fårga hur man skriver en forloop i java",
                    "level": 1
                }
            })
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            props.setQuestion(data.content)
            const message:Message = {from:"gpt",content:data.content}
            setChat(prevChat => [...prevChat, message])
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, []);

    useEffect(() => {

        
    }, [chat.length]);
    
    
    function sendAnswer(answer:string){


         fetch("http://localhost:8080/chat/answer", {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify({ 
                 "question": {"question": props.question},
                 "answer": {"answer": answer},
                 "teacher": {    
                     "name": "janne",
                     "description": "Du är en passionerad lärare som brinner för programmering"
                 }
             })
         })
        .then((res) => {
             return res.json();
         })
        .then((data) => {
            const message:Message = {from:"gpt",content:data.content}
            setChat(prevChat => [...prevChat, message])
         })
        .catch((error) => {
             console.error("Error fetching data:", error);
         });
    
    }
    
    
  return (
    <div className='chat-window' id='chat-window-wrapper'>

        <ul className='chat-window'>
            {chat.map((message, index) => (
                <li className={message.from} key={index}>{message.content}</li>
            ))}
            
        </ul>

{/*         <p className='chat-window'>
            {props.question}
        </p> */}
        <form action="" className='chat-window'  onSubmit={(e)=>{
                    const message:Message = {from:"me",content:answer};
                    setChat(prevChat => [...prevChat, message]);
                    setAnswer("");
            e.preventDefault();
            sendAnswer(answer);
            
        }
        }>
            <input className='chat-window' type="text" placeholder="Ställ följd frågor" value={answer} onChange={(e)=>setAnswer(e.target.value)}/>
            <button className='chat-window' type="submit">Skicka</button>
        </form>
    </div>
  )
}
