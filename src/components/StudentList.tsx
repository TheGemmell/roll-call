import { Button } from "@mui/material";
import { fs, path } from "@tauri-apps/api";
import { useState, useEffect } from 'react'
import { Roll, Student } from '../lib/Student'
import StudentButton from "./StudentButton";

export default function StudentGrid() {
  const [ students, setStudents ] = useState<Roll>([])

  path.appDir().then(data => console.log(data))
  
  function studentsNeeded(roll: Roll) {
    fs.readTextFile(`C:/Users/Chris/Development/roll-call/src/components/students.csv`).then((csv) => {
      let data = csv.split("\n")
      data.forEach(student => {
        roll.newStudent(student)
      })
      console.log(data)
      roll.listStudents()
      setStudents(roll)
    })
  }
  
  useEffect(() => {
    let roll = new Roll(new Date());
    studentsNeeded(roll)
  }, [])

  console.log(students)

  const handleClick = () => {
    console.log(students)
    console.log(students.listStudents())
    
  }

  if (students.students) {
    return (
      <div>
        <h1>Students</h1>
        <Button onClick={handleClick}>Click</Button>
        {students.students.length}
        {students.students.map((student, index) => <StudentButton key={index} student={student}/>)}
      </div>
    );

  }
  else {
    return (
      <h1>Loading...</h1>
    )
  }
}
