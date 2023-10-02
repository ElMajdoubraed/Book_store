import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

export const GoogleButton = styled(Button)`
  background-color: #fff !important;
  color: #81322a !important;
  border: 1px solid #81322a !important;
  &:hover {
    background-color: #81322a !important;
    color: #fff !important;
  }

  &:focus {
    background-color: #81322a !important;
    color: #fff !important;
  }
`;

const useStyles: any = makeStyles((theme: any) => ({
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));
export default function GoogleAuthButton() {
  const classes = useStyles();
  return (
    <Link href="/api/google" passHref>
      <GoogleButton
        variant="outlined"
        color="secondary"
        className={classes.button}
        fullWidth
      >
        <FormattedMessage id={"btn.loginWithGoogle"} />
      </GoogleButton>
    </Link>
  );
}
