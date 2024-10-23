import React, { useEffect, useState } from 'react'
import "./css/TopicSelector.css"
import { Link } from 'react-router-dom';

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

interface Props{
    subjekt: Subjekt| undefined;
    setSubjekt: React.Dispatch<React.SetStateAction<Subjekt>>;
}

export default function TopicSelector(props: Props) {
    const [topics, setTopics] = useState<Topic[]>([]);



    useEffect(() => {
        fetch("http://localhost:8080/topic/allTopics",{
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
                console.log("added subject to topic: " + incomingTopic.topic);
              } else {
                let newTopic: Topic = {
                  topic: incomingTopic.topic,
                  subjekts: [incomingTopic]
                };
                updatedTopics.push(newTopic);
                console.log("new topic: " + incomingTopic.topic);
              }
            });
      
            setTopics(updatedTopics);
            console.log("Updated topics:", updatedTopics);
          })
          .catch(error => console.error('Error:', error));

        }, []);
      
  return (
    <div>
        {topics.map((topic, index) => (
            <div>
            <h2 className='topic-headline'>{topic.topic}</h2>
            <ul className='topic-wrapper' key={index}>
                
                {topic.subjekts.map((subj, subIndex) => (
                  <Link to={"/chat"}>
                    <li className='topic-tile' key={subIndex} onClick={()=>props.setSubjekt(subj)}>
                        <h4 className='tile-headline'>{subj.title}</h4>
                       {/*  <p className='description'>{subj.description}</p> */}
                        <p className='level'>Svårighetsgrad: {subj.level} av 10</p>
                    </li></Link>))}

            </ul>
            </div>
        ))}
      
    </div>
  )
}
