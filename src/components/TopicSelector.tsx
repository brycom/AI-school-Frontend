import React, { useEffect, useState } from 'react'
import "./css/TopicSelector.css"
import { Link } from 'react-router-dom';
import Teachers from './topicSubComponents/TopicCard/Teachers';

interface Topic{
    topic: string;
    subjekts: Subjekt[];
}

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

interface Props{
    subjekt: Subjekt| undefined;
    setSubjekt: React.Dispatch<React.SetStateAction<Subjekt>>;
    teacher: Teacher| undefined;
    setTeacher: React.Dispatch<React.SetStateAction<Teacher>>;
    url:string;
}

export default function TopicSelector(props: Props) {
    const [topics, setTopics] = useState<Topic[]>([]);



    useEffect(() => {
        fetch(props.url+"/topic/allTopics",{
              method: 'GET',
            credentials: 'include'
        })
          .then(response => response.json())
          .then(data => {
            const updatedTopics: Topic[] = [];
      
            data.forEach((incomingTopic: any) => {
              const existingTopic = updatedTopics.find(t => t.topic === incomingTopic.topic);
      
              if (existingTopic) {
                existingTopic.subjekts.push(incomingTopic);
              } else {
                let newTopic: Topic = {
                  topic: incomingTopic.topic,
                  subjekts: [incomingTopic]
                };
                updatedTopics.push(newTopic);

              }
            });
      
            setTopics(updatedTopics);
            
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            alert("Failed to load topics: " + error.message);
          });

        }, []);
      
  return (
    <div>

      <Link to={"/account"}>
        <button>Välj abunumang</button>
        </Link>
        {topics.map((topic, topicIndex) => (
          <div key={topicIndex}>
              <Teachers url={props.url} topic={topic.topic} SetTeacher={props.setTeacher}></Teachers>
            <h2 className='topic-headline'>{topic.topic}</h2>
            <ul className='topic-wrapper'>
                
                {topic.subjekts.map((subj, subIndex) => (
                  <Link to={"/chat"} key={subIndex}>
                    <li className='topic-tile'  >
                        <h4 className='tile-headline' onClick={()=>props.setSubjekt(subj)}>{subj.title}</h4>
                        <p className='level'>Svårighetsgrad: <input className='level-input' type="number" defaultValue={subj.level} /* defaultValue={1} */
                        onClick={(e)=>{e.preventDefault()}} onChange={(e)=>subj.level = Number(e.target.value)} /> av 10</p>
                    </li></Link>))}

            </ul>
            </div>
        ))}
      
    </div>
  )
}
