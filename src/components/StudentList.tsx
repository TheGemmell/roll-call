import { Button } from "@mui/material";
import { fs, path } from "@tauri-apps/api";
import { useState, useEffect, Key } from 'react'
import { Roll, Student } from '../lib/Student'
import StudentButton from "./StudentButton";

export default function StudentGrid({file, date}:{file: string, date: string}) {
  const [ studs, setStudents ] = useState<Roll | any>([])

  path.appDir().then(data => console.log(data))
  
  function studentsNeeded(roll: Roll) {
    fs.readTextFile(file).then((csv) => {
      let data = csv.split("\n")
      data.forEach(student => {
        roll.newStudent(student)
      })
      console.log(data)
      roll.listStudents(date)
      setStudents(roll)
    })
  }
  
  useEffect(() => {
    let roll = new Roll();
    studentsNeeded(roll)
  }, [file])

  console.log(studs)

  const handleExport = () => {
    let stringToWrite = studs.listStudents(date)
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
        <Button onClick={handleExport}>Export</Button>
        <p>
          {studs.students.length}
        </p>
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
