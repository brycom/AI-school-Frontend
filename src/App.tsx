import { SetStateAction, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Start from './components/Start'
import TearSelector from './components/TearSelector'
import Chat from './components/Chat'
import TopicSelector from './components/TopicSelector'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'


interface Subjekt{
  id: string;
  topic: string;
  title: string;
  description: string;
  level: number;
}

function App() {
  const [subjekt, setSubjekt] = useState<Subjekt>({id: '', topic: '', title: "", description: "", level:0});
  const [logedIn, setLogedIn] = useState<boolean>(false);


  return (

    <BrowserRouter>
    <Routes>
      <Route path="*" element={<Start></Start>} />
      <Route path="/tear-selector" element={<TearSelector></TearSelector>} />
      <Route path="/chat" element={/* logedIn && */<Chat subjekt={subjekt} setSubjekt={setSubjekt}></Chat>} />
      <Route path="/topic-selector" element={/* logedIn && */<TopicSelector subjekt={subjekt} setSubjekt={setSubjekt}></TopicSelector>} />
      <Route path="/signup" element={<CreateAccount />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    
    
    </BrowserRouter>

 
  )
}

export default App
