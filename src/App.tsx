import { SetStateAction, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Start from './components/Start'
import TearSelector from './components/TearSelector'
import Chat from './components/Chat'
import TopicSelector from './components/TopicSelector'


interface Subjekt{
  id: string;
  topic: string;
  title: string;
  description: string;
  level: number;
}

function App() {
  const [subjekt, setSubjekt] = useState<Subjekt>();


  return (
    <>
    {/* <Start></Start> */}
    {/* <TearSelector></TearSelector> */}
    {subjekt && <Chat subjekt={subjekt} setSubjekt={setSubjekt}></Chat> }
    {!subjekt &&<TopicSelector subjekt={subjekt} setSubjekt = {setSubjekt}></TopicSelector>}

    </>
  )
}

export default App
