import React from "react";
import TextField from "@material-ui/core/TextField";
import { FormControl, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const StyledTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    transition: all 0.3s ease-in-out;
  }
  .MuiOutlinedInput-root:focus {
    transform: scale(1.01);
  }
`;

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

type TextInputProps = {
  name?: string;
  label: string;
  required?: boolean;
  type?: string;
  value?: any;
  rows?: number;
  autoComplete?: string;
  defaultValue?: any;
  multiline?: boolean;
  onChange: (value: any) => void;
  focused?: boolean;
  variant?: "filled" | "outlined" | "standard";
};

export default function TextInput({
  name,
  label,
  focused,
  value = undefined,
  type,
  multiline,
  defaultValue,
  rows,
  required,
  onChange,
  variant = "outlined",
  ...props
}: TextInputProps) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.root}>
      <StyledTextField
        required={required || false}
        variant={variant}
        type={type || "text"}
        value={value}
        minRows={rows || 1}
        focused={focused}
        multiline={multiline || false}
        fullWidth
        defaultValue={defaultValue}
        name={name}
        label={label?.toString()}
        onChange={(e: any) => onChange(e.target.value)}
        {...props}
      />
    </FormControl>
  );
}
