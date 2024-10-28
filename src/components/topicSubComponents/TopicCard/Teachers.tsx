import React, { useEffect, useState } from 'react'
import Select, { OptionsOrGroups, GroupBase, SingleValue } from "react-select";


interface Teacher{
    name: string;
    topic: [];
    description: String;
  
  }

interface Props{
    topic: string
    SetTeacher: React.Dispatch<React.SetStateAction<Teacher>>
}

interface Option {
    value: string;
    label: string;
  }

export default function Teachers(props:Props) {

    const [options, setOptions] = useState<Option[]>([]);

      const [selectedOption, setSelectedOption] = useState<Option| null>();
      const [teachers, setTeachers] = useState<Teacher[]>([]);



    useEffect(() => {

        fetch("http://localhost:8080/admin/teacher/teacherByTopic/"+props.topic,{
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            const teachersForList = data.map((teacher: Teacher) => ({
                value: teacher.name,
                label: teacher.name,
              }            
            ));
            
               const teachersForTeachers:Teacher[] = data.map((teacher: Teacher) =>({
                        name: teacher.name,
                        topic: teacher.topic,
                        description: teacher.description,
                }));

                setTeachers(teachersForTeachers)
              setOptions(teachersForList);
        })
        
    }, []);

    const handleChange = (option: SingleValue<Option>) => {
        setSelectedOption(option);
        
        teachers.forEach(teacher =>{
                if(option != null && teacher.name === option.value){
                    props.SetTeacher(teacher);
                    console.log("Här ska det vara rät?????   "+teacher.name);
                    
                }
        })
      };

  
  return (
    <div>
        <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select Teacher"
        inputValue=""
        onInputChange={() => {}}
        onMenuOpen={() => {}}
        onMenuClose={() => {}}
      />
       <p>Selected: {selectedOption?.label}</p>

      
    </div>
  )
}
