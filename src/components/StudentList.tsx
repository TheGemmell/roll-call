import { Button } from "@mui/material";
import { fs, path, dialog } from "@tauri-apps/api";
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
      setStudents(roll)
    })
  }
  
  useEffect(() => {
    let roll = new Roll();
    studentsNeeded(roll)
  }, [file])

  const handleExport = async () => {
    let stringToWrite = studs.listStudents(date)
    console.log('stringToWrite', stringToWrite)
    const filePath = await dialog.save({
      title: "Please Select A Location To Save",
      filters: [{
        name: "Comma-Seperated Values",
        extensions: ['csv']
      }]
    })
    .then(data => {
      fs.writeFile({
        path: data,
        contents: stringToWrite
      })
      return data
    })
    .catch(err => {
      console.log(err)
    })
    console.log('Successfully saved to: ', filePath)
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
