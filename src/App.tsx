import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import Start from './components/Start'
import TearSelector from './components/TearSelector'
import Chat from './components/Chat'
import TopicSelector from './components/TopicSelector'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import { Client } from '@stomp/stompjs'


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

  useEffect(() => {
    console.log("Trying to connect!");

    const socket = /* new SockJS("http://localhost:8080/connect") */new WebSocket('ws://localhost:8080/connect');

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

    <BrowserRouter>
    <Routes>
      <Route path="*" element={<Start></Start>} />
      <Route path="/tear-selector" element={<TearSelector></TearSelector>} />
      <Route path="/chat" element={/* logedIn && */<Chat stompClient={stompClient} subjekt={subjekt} setSubjekt={setSubjekt} teacher={teacher} setTeacher={setTeacher}></Chat>} />
      <Route path="/topic-selector" element={/* logedIn && */<TopicSelector subjekt={subjekt} setSubjekt={setSubjekt} teacher={teacher} setTeacher={setTeacher}></TopicSelector>} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    
    
    </BrowserRouter>

 
  )
}

export default App
