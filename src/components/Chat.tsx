import React, { useEffect, useState } from 'react'
import ChatWindow from './chatSubComponents/ChatWindow'
import QuestionList from './chatSubComponents/QuestionList'
import "./css/Chat.css"
import { Link } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import Logout from './Logout';

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

interface Props{
  subjekt: Subjekt;
  setSubjekt: React.Dispatch<React.SetStateAction<Subjekt>>;
  teacher: Teacher| undefined;
  setTeacher: React.Dispatch<React.SetStateAction<Teacher>>;
  url:string;
}

export default function Chat(props: Props) {

  const [question, setQuestion] = useState<string>("");
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    console.log("Trying to connect!");

    const socket = new WebSocket('wss://octopus-app-zquiu.ondigitalocean.app/connect');

    const client = new Client({
      webSocketFactory: () => socket as WebSocket,
      reconnectDelay: 5000,
      onConnect: () => {
        setStompClient(client);
        console.log("Connection established");
      },
      onDisconnect: () => {
        console.log("Disconnected from websocket");
      },
      onWebSocketError: (error) => {
        console.error("WebSocket Error: ", error);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);
  

  return (
    <>
    <Logout url={props.url}></Logout>
    <Link to={"/topic-selector"}>
    <button>Nytt ämne</button>
    </Link>
   <div className='chat-wrapper'>
    <QuestionList url={props.url} subjekt={props.subjekt} ></QuestionList>
    <ChatWindow url={props.url} teacher={props.teacher} question={question} setQuestion={setQuestion} setSubjekt={props.setSubjekt} subjekt={props.subjekt} stompClient={stompClient}></ChatWindow>
   </div>
    
    </>
  )
}
