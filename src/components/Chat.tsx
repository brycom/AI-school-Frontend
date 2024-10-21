import React, { useState } from 'react'
import ChatWindow from './chatSubComponents/ChatWindow'
import QuestionList from './chatSubComponents/QuestionList'
import "./css/Chat.css"

interface Teacher{
  name: string;
  topic: string;
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
  setSubjekt: React.Dispatch<React.SetStateAction<Subjekt|undefined>>;
}

export default function Chat(props: Props) {

  const [question, setQuestion] = useState<string>("");
  const[teacher, setTeacher] = useState<Teacher>();

  return (
   <div className='chat-wrapper'>
    <button onClick={()=>props.setSubjekt(undefined)}>Nytt ämne</button>
    <QuestionList></QuestionList>
    <ChatWindow question={question} setQuestion={setQuestion} subjekt={props.subjekt}></ChatWindow>
   </div>
  )
}
