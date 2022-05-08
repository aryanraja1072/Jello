import React from 'react'
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const AlertBox = ({severity, alertTitle, description, isClosed, setClosed}) => {
  return (
    <Alert
    severity={severity}
    action={
      <IconButton
        aria-label="close"
        color="inherit"
        size="small"
        onClick={()=>{
          setClosed(true);
        }}
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    }
    sx={{ mb: 2 }}
  >
    <AlertTitle>{alertTitle}</AlertTitle>
    {description}
  </Alert>
  )
}

export default AlertBox