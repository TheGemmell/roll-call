import { Button, Stack, TextField } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { dialog } from '@tauri-apps/api';
import React from 'react';

type stateAct = React.Dispatch<React.SetStateAction<string | undefined>> | React.Dispatch<React.SetStateAction<string>>

export default function InitSettings({date, setDate, setFile}: {date: string, setDate: stateAct, setFile: stateAct}) {
  
  const handleUpload = async () => {
    const filePath = await dialog.open({
      title: "Please Select a CSV File",
      filters: [{
        name: "Comma-Seperated Values",
        extensions: ['csv']
      }]
    })
    .then(data => {
      return data
    })
    .catch(err => {
      console.log(err)
    })
    console.log(filePath)
    setFile(filePath as string)

  }
  
  return (
    <Stack direction="row" component="form" noValidate spacing={2}>
      <TextField
        id="date"
        label="Day"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button onClick={handleUpload} variant="contained" startIcon={<UploadIcon fontSize="small" />}>
        Import
      </Button>
    </Stack>
  );
}
