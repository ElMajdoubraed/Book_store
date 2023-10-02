import React from "react";
import TextField from "@material-ui/core/TextField";
import { FormControl, makeStyles } from "@material-ui/core";
import styled from "styled-components";

const useStyles: any = makeStyles((theme: any) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

const StyledFileInput = styled(TextField)`
  input[type="file"] {
    color: transparent !important;
    cursor: pointer;
  }
  input[type="file"]::-webkit-file-upload-button {
    display: none !important;
  }
  input:valid {
    color: #29221f !important;
  }
`;

type FileInputProps = {
  name?: string;
  label: string;
  required?: boolean;
  type?: string;
  value?: any;
  accept?: string;
  rows?: number;
  autoComplete?: string;
  multiline?: boolean;
  onChange: (value: any) => void;
  variant?: "filled" | "outlined" | "standard";
};

export default function FileInput({
  name,
  label,
  value = undefined,
  required,
  accept,
  onChange,
  variant = "outlined",
  ...props
}: FileInputProps) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.root}>
      <StyledFileInput
        required={required || false}
        variant={variant}
        placeholder="اختر ملف"
        type="file"
        inputProps={{ accept: "image/*" }}
        value={value}
        fullWidth
        focused
        name={name}
        label={label?.toString()}
        onChange={(e: any) => onChange(e)}
        {...props}
      />
    </FormControl>
  );
}
