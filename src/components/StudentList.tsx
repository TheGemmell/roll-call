import { fs, path } from "@tauri-apps/api";

export default function StudentList() {
    path.appDir().then(data => console.log(data))
    fs.readTextFile('/Users/ghostday/Development/generation/roll-call/src/components/data.csv').then((data) => {console.log(data)})

    return (
        <h1>Student List</h1>
    )
}