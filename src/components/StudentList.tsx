import { Button } from "@mui/material";
import { fs, path } from "@tauri-apps/api";
import { useState, useEffect } from 'react'
import { Roll, Student } from '../lib/Student'
import StudentButton from "./StudentButton";

export default function StudentGrid() {
  const [ students, setStudents ] = useState<Student[]>([])

  let roll = new Roll(new Date());
  path.appDir().then(data => console.log(data))

  function studentsNeeded() {
    fs.readTextFile(`C:/Users/Chris/Development/roll-call/src/components/students.csv`).then((csv) => {
      let data = csv.split("\n")
      data.forEach(student => {
        roll.newStudent(student)
      })
      console.log(data)
      roll.listStudents()
      setStudents(roll.students)
    })
  }

  useEffect(() => {
      studentsNeeded()
  }, [])

  console.log(students)

  const handleClick = () => {
    console.log(students)
  }

  if (students) {
    return (
      <div>
        <h1>Students</h1>
        <Button onClick={handleClick}>Click</Button>
        {students.length}
        {students.map((student, index) => <StudentButton key={index} student={student}/>)}
      </div>
    );

  }
  else {
    return (
      <h1>Loading...</h1>
    )
  }
}
