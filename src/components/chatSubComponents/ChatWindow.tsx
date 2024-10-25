import { SetStateAction, useEffect, useState} from 'react'
import { json } from 'react-router-dom';

interface Props{
    question:string;
    setQuestion:React.Dispatch<React.SetStateAction<string>>;
    subjekt:Subjekt;

}

interface Subjekt{
    id: string;
    topic: string;
    title: string;
    description: string;
    level: number;
}

interface Message{
    content: string;
    from: string;
}

interface Content{
    correct: boolean;
    feedback: string;
}



export default function ChatWindow(props: Props) {
    const [answer, setAnswer] = useState<string>("");
    const[chat, setChat] = useState<Message[]>([]);
    const [newQuestion, setNewQuestion] = useState<boolean>(false);
    
    
    
    useEffect(() => {
        
        fetch("http://localhost:8080/chat/question", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                teacher: {    
                    "name": "janne",
                    "description": "Du är en passionerad lärare som brinner för programmering"
                }, 
                topic: {
                    "id":props.subjekt.id,
                    "topic": props.subjekt.title,
                    "description": props.subjekt.description,
                    "level": props.subjekt.level
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
    }, [newQuestion]);

    
    
    function sendAnswer(answer:string){


         fetch("http://localhost:8080/chat/answer", {
             method: 'POST',
             credentials: 'include',
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
           let content:Content = JSON.parse(data.content);
           console.log(content);
           if(content.correct == true && newQuestion == false) {
             setNewQuestion(true);
           }else if(content.correct == true && newQuestion == true){
            setNewQuestion(false);
           }
           
            
            const message:Message = {from:"gpt",content:content.feedback}
            setChat(prevChat => [...prevChat, message])
            console.log(data.content.feedback);
            
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
