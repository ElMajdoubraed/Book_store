import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import {
  makeStyles,
  OutlinedInput,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@material-ui/core";

const useStyles = makeStyles((theme: any) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
}));

type PasswordInputProps = {
  name?: string;
  label: string;
  required?: boolean;
  value?: any;
  autoComplete?: string;
  onChange: (value: any) => void;
};

export default function PasswordInput({
  name,
  label,
  value = undefined,
  required,
  onChange,
  ...props
}: PasswordInputProps) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl fullWidth variant="outlined" className={classes.root}>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <OutlinedInput
        required={required}
        id={name}
        type={showPassword ? "text" : "password"}
        label={label}
        onChange={(e: any) => onChange(e.target.value)}
        {...props}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
