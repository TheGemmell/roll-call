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


    finalize(date: string) {
        return `${this.studentId},${this.firstName},${this.lastName},${date},${this.status},\r`;
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
        let strings = this.students.map(student => student.finalize(this.date))
        console.log(strings)
        return strings
    }
}