import { Button } from "@mui/material";
import { Student } from "../lib/Student";
import React, { useState } from 'react'

export default function StudentButton({ stud }: { stud: Student }) {
  const [curStudent, setStudent] = useState<Student>()

  const options = ["Present", "Absent", "Absent - Excused", "Late", "Late - Excused", "Holiday"]

  const handleClick = (e: React.MouseEvent) => {
    stud.status = "Present"
    setStudent(stud)
  }

  const handleContextClick = (e: React.MouseEvent) => {

  }

  function buttonStyle(student: Student) {
    let color: "primary" | "secondary" | "success" | "warning" | "error" | "info"
    let variant: "contained" | "outlined" | "text" 
    switch (student.status) {
      case options[0]:
        color = "success"
        variant = "outlined"
        break;
      case options[1]:
        color = "error"
        variant = "contained"
        break;
      case options[2]:
        color = "error"
        variant = "outlined"
        break;
      case options[3]:
        color = "warning"
        variant = "contained"
      break;
      case options[4]:
        color = "warning"
        variant = "outlined"
      break;
      default:
        color = "secondary"
        variant = "text"
      break;
    }
    
    
    return (
      <Button color={color} variant={variant} onClick={handleClick} onContextMenu={handleContextClick}>
        <p>{`${student.firstName} ${student.lastName}`}</p>
        <p>{student.status}</p>
      </Button>
    )
    
  }

  return (
    <div>
      {buttonStyle(stud)}
    </div>
  )
}