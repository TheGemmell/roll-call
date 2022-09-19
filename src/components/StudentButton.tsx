import { Button, Menu, MenuItem, Tooltip } from "@mui/material";
import { Student } from "../lib/Student";
import { Key, MouseEvent, useState } from 'react'

export default function StudentButton({ stud, listId, delStud }: { stud: Student, listId: Key, delStud: Function }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [curStudent, setStudent] = useState<Student>()
  const [contextMenu, setContextMenu] = useState<{mouseX: number, mouseY: number} | null>(null);
  const [open, setOpen] = useState(false);

  const options = ["Present", "Absent", "Absent - Excused", "Late", "Late - Excused", "Holiday"];

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.innerText)
    stud.status = "Present"
    setStudent(stud)
  }

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
          }
        : // Obscure code to help some broswers not fuck-up
          null,
    );
  }

  const handleDoubleClick = (e: MouseEvent<HTMLElement>) => {
    console.log(`delete no. ${listId}`);
    setContextMenu(null);
    delStud(listId);
  }

  const handleClose = (e: MouseEvent<HTMLElement>) => {
    let targ = e.currentTarget?.innerText
    setContextMenu(null);
    if (targ) {
      stud.status = targ
      setStudent(stud)
    }
  };

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
    const handleToolClose = () => {
      setOpen(false);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    return (
      <>
        <Tooltip
        open={open} onClose={handleToolClose} onOpen={handleOpen}
        arrow={true} placement="right"
        enterDelay={700}
        title={stud.status ? stud.status : ""}
        >
          <Button className="student-button" color={color} variant={variant} onClick={handleClick} onContextMenu={handleContextMenu}>
            <p className="button-text">{`${student.firstName} ${student.lastName}`}</p>
          </Button>
        </Tooltip>
        <Menu
        open={contextMenu !== null} onClose={handleClose} anchorReference="anchorPosition"
        anchorPosition={ contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined }
        >
          {options.map((option, index) => {
            return (
              <MenuItem onClick={handleClose} key={index}>
                {option}
              </MenuItem>
            )
          })}
          <MenuItem onDoubleClick={handleDoubleClick}>
          DELETE
          </MenuItem>
        </Menu>
      </>
    )

  }


  return (
    <div>
      {buttonStyle(stud)}
    </div>
  )
}
