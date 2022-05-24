import { Button } from "@mui/material";
import { fs, path } from "@tauri-apps/api";
import { useState, useEffect, Key } from 'react'
import { Roll, Student } from '../lib/Student'
import StudentButton from "./StudentButton";

export default function StudentGrid() {
  const [ studs, setStudents ] = useState<Roll | any>([])

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

  console.log(studs)

  const handleClick = () => {
    let stringToWrite = studs.listStudents()
    console.log('stringToWrite', stringToWrite)
    fs.writeFile({
      path: 'C:/Users/Chris/Development/roll-call/src/components/newStudents.csv',
      contents: stringToWrite
    },{})
  }

  if (studs.students) {
    return (
      <div>
        <h1>Students</h1>
        <Button onClick={handleClick}>Click</Button>
        {studs.students.length}
        {studs.students.map((student: Student, index: Key | null | undefined) => <StudentButton key={index} stud={student}/>)}
      </div>
    );

  }
  else {
    return (
      <h1>Loading...</h1>
    )
  }
}
