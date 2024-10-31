import { useEffect, useState } from 'react'

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
  url: string;
}

export default function QuestionList(props:Props) {
   const [questions, setQuestions] = useState<Question[]>([]);


  useEffect(() => {
    
    
    if(props.subjekt){
    fetch(props.url+"/questions/last-ten/"+props.subjekt.id,{
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      setQuestions(data);
     // console.log(data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    }
    )
  }
  }, [props.subjekt]);
  return (
    <div className='questions' id='questions-wrapper'>
       <h3>Dina senaste {questions.length} Frågor om {props.subjekt.topic}</h3>
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
