import { useState } from 'react'
import './App.css';
import InitialSettings from './components/InitialSettings'
import StudentList from './components/StudentList'

function App() {
  const todaysDate = new Date().toISOString().split("T")[0]

  const [ file, setFile ] = useState<string>()
  const [ date, setDate ] = useState(todaysDate)

  return (
    <div className="App">
        <InitialSettings date={date} setDate={setDate} setFile={setFile}/>
      {/* <StudentList /> */}
    </div>
  );
}

export default App;
