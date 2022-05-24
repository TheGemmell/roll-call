import InitialSettings from './components/InitialSettings'
import './App.css';
import StudentList from './components/StudentList'
import { Stack } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Stack component="form" noValidate spacing={2}>
        <InitialSettings />
      </Stack>
      <StudentList />
    </div>
  );
}

export default App;
