import { Button } from "@mui/material";
import { Student } from "../lib/Student";
import { useState } from 'react'

export default function StudentButton({student}: {student: Student}) {
    const [curStudent, setStudent] = useState(student)
    
    const handleClick = (e) => {
        console.log(student)
        console.log(e)
        student.status = "Present"
        setStudent(student)
    }

    console.log('Student Passed: ', student)

    return (
        <div>
            <Button color="secondary" onClick={handleClick}>
                {`${curStudent.firstName} ${student.lastName}`}
            </Button>
        </div>
    )
}