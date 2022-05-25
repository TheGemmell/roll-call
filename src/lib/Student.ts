export class Student {
    studentId: string;
    firstName: string;
    lastName: string;
    status: string | undefined;
    
    constructor(studentId: string, firstName: string, lastName: string) {
        this.studentId = studentId
        this.firstName = firstName;
        this.lastName = lastName;
    }

    finalString(date: string) {
        return `${this.studentId},${this.firstName},${this.lastName},${date},${this.status},`;
    }

}


export class Roll {
    date: string
    students: Array<Student>

    constructor(date: Date) {
        this.students = [];
        this.date = date.toISOString().split('T')[0]
    }

    newStudent(csvString: string) {
        const data = csvString.split(',')
        let id = data[0]
        let first = data[1]
        let last = data[2]
        let s = new Student(id, first, last);
        this.students.push(s)
    }

    listStudents() {
        let studentArr = this.students.map(student => student.finalString(this.date))
        let csvStrings = studentArr.join('\n')
        let headings = `Learner ID,First Name,Last Name,Date [YYYY-MM-DD],Status,Notes\n`
        return `${headings}${csvStrings}`
    }

}
