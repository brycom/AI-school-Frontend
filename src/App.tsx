import { useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import TearSelector from './components/TearSelector'
import Chat from './components/Chat'
import TopicSelector from './components/TopicSelector'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import { Client } from '@stomp/stompjs'
import Account from './components/Account'


interface Subjekt{
  id: string;
  topic: string;
  title: string;
  description: string;
  level: number;
}

interface Teacher{
  name: string;
  topic: [];
  description: String;

}

function App() {
  const [subjekt, setSubjekt] = useState<Subjekt>({id: '', topic: '', title: "", description: "", level:0});
  const[teacher, setTeacher] = useState<Teacher>({ topic: [],description: '',name:""});
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const url:string = /* "https://octopus-app-zquiu.ondigitalocean.app" */ "http://localhost:8080"

  useEffect(() => {
    console.log("Trying to connect!");

    const socket = new WebSocket('wss://octopus-app-zquiu.ondigitalocean.app/connect'   /*  "ws://localhost:8080/connect"*/ );

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
      <h1>Hallå i stugan!!!!</h1>
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<Start ></Start>} />
      <Route path="/tear-selector" element={<TearSelector url={url}></TearSelector>} />
      <Route path="/chat" element={<Chat url={url} stompClient={stompClient} subjekt={subjekt} setSubjekt={setSubjekt} teacher={teacher} setTeacher={setTeacher}></Chat>} />
      <Route path="/topic-selector" element={<TopicSelector url={url} subjekt={subjekt} setSubjekt={setSubjekt} teacher={teacher} setTeacher={setTeacher}></TopicSelector>} />
      <Route path="/signup" element={<CreateAccount url={url} />} />
      <Route path="/login" element={<Login url={url} />} />
      <Route path="/account" element={<Account></Account>} />
    </Routes>
    
    
    </BrowserRouter>
    
    </>


 
  )
}

export default App
