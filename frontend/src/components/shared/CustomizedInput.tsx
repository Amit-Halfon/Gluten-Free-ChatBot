import { TextField } from '@mui/material';
import React from 'react'

type Props={
    name: string;
    type: string;
    label:string;
}

const CustomizedInput = (props: Props) => {
  return (
    <TextField margin='normal' sx={{"& .MuiInputLabel-root": {
          color: "#0b321a", // Change label color
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#0b321a", // Change label color when focused
        }, width: "400px"}}  name={props.name} label={props.label} type={props.type} />
  )
}

export default CustomizedInput
