import { Client } from '@stomp/stompjs';
import { useEffect, useState} from 'react'

interface Props{
    question:string;
    setQuestion:React.Dispatch<React.SetStateAction<string>>;
    subjekt:Subjekt;
    teacher:Teacher|undefined;
    stompClient:Client| null;
    url:string;

}

interface Teacher{
    name: string;
    topic: [];
    description: String;
  
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

    //const [response, setResponse] = useState<any>(null);
    
    
    
    useEffect(() => {
        
        
        fetch(props.url+"/chat/question", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                teacher: {    
                    "name": props.teacher?.name,
                    "description": props.teacher?.description
                }, 
                topic: {
                    "id":props.subjekt.id,
                    "topic": props.subjekt.title,
                    "description": props.subjekt.description,
                    "level": props.subjekt.level
                }
            })
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [newQuestion]);

    useEffect(() => {
        console.log("Loading");
        
        if(props.stompClient){
            console.log("Stomp client is conected");
            
            const sub = props.stompClient.subscribe("/topic", (message) => {
                console.log(message.body);
                
                const newResponse = message.body;
               // console.log('Received:', newResponse);
                //setResponse(newResponse);
                //setNewQuestion(true);
                props.setQuestion(newResponse);
                const message1 = { from: "gpt", content: newResponse };
                setChat(prevChat => [...prevChat, message1]);
            });
                


            return () => {
                sub.unsubscribe();
            };

            
        }else{
            console.log("Stomp client not connected");
        }
    }, [props.stompClient,newQuestion]);
    
    
    function sendAnswer(answer:string){

         fetch(props.url+"/chat/answer", {
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
           if (content.correct) {
            setNewQuestion(prev => !prev);
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
