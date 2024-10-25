import React, { useEffect, useState } from 'react'

interface Subjekt{
  id: string;
  topic: string;
  title: string;
  description: string;
  level: number;
}

interface Question{
  id: string;
  topicId: string;
  status: boolean;
  userId: string;
  question: string;
}

interface Props{
  subjekt:Subjekt;
}

export default function QuestionList(props:Props) {
   const [questions, setQuestions] = useState<Question[]>([]);


  useEffect(() => {
    
    if(props.subjekt){
    fetch("http://localhost:8080/questions/last-ten/"+props.subjekt.id,{
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setQuestions(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    }
    )
  }
  }, [props.subjekt]);
  return (
    <div className='questions' id='questions-wrapper'>
          <ul className=' questions'>
            {questions.map((question, index) => (
              <li className='questions' key={index}>
                <p>{question.question}</p>
                {question.status === true && <p>!!</p>}
                </li>
            ))}

        </ul>
    </div>
  )
}
