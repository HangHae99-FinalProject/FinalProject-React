import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

//props 설명
// label
// - Required 필수 입력값
// - Disabled 임의 입력값

function Input(props) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required={props._required}
          id={props._id}
          type={props._type}
          label={props._label}
          defaultValue={props._defaultValue}
        />
      </div>
    </Box>
  );
}

export default Input;
