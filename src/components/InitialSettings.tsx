import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function DatePicker() {
  const todaysDate = new Date().toISOString().split("T")[0]
  
  return (
      <TextField
        id="date"
        label="Day"
        type="date"
        defaultValue={todaysDate}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
  );
}
