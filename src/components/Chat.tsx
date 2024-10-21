import React, { useState } from 'react'
import ChatWindow from './chatSubComponents/ChatWindow'
import QuestionList from './chatSubComponents/QuestionList'
import "./css/Chat.css"

interface Teacher{
  name: string;
  topic: string;
  description: String;

}

export default function Chat() {

  const [question, setQuestion] = useState<string>("");
  const[teacher, setTeacher] = useState<Teacher>();

  return (
   <div className='chat-wrapper'>
    <QuestionList></QuestionList>
    <ChatWindow question={question} setQuestion= {setQuestion}></ChatWindow>
   </div>
  )
}
