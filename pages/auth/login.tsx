import Head from "next/head";
import { AuthLayout } from "@/layouts";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { PasswordInput, TextInput } from "@/components/inputs";
import { useState } from "react";
import { login } from "@/hooks/useAuth";
import { Box } from "@mui/material";
import { Alert } from "@material-ui/lab";
import styled from "styled-components";
import { GoogleAuthButton } from "@/components/button";

export const Form = styled.form`
  align-items: center;
`;

const useStyles: any = makeStyles((theme: any) => ({
  form: {
    marginTop: theme.spacing(3),
    minWidth: "70%",
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function Login() {
  const router = useRouter();
  const classes = useStyles();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await login({ email, password });
      router.push("/");
    } catch (e) {
      setHasError(true);
      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>تسجيل الدخول - كتبي</title>
        <meta
          name="description"
          content="قم بتسجيل الدخول إلى حسابك في كتبي وابدأ في إنشاء قائمة الطعام الخاصة بك على الإنترنت."
        />
      </Head>
      <AuthLayout>
        <Typography component={"span"} variant="h5">
          <FormattedMessage id={"title.login"} />
        </Typography>
        {hasError && (
          <Box marginTop={3}>
            <Alert severity="error">
              <FormattedMessage id={"error.login"} />
            </Alert>
          </Box>
        )}
        <Form className={classes.form} onSubmit={onSubmit}>
          <TextInput
            name="email"
            required
            label="البريد الإلكتروني"
            type="email"
            autoComplete="email"
            onChange={setEmail}
          />

          <PasswordInput
            name="password"
            label="كلمة المرور"
            required={true}
            autoComplete="password"
            onChange={setPassword}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            <FormattedMessage id={"btn.continue"} />
          </Button>
          <GoogleAuthButton />
          <Box marginTop={2}>
            <NoAccount />
          </Box>
          <Box marginTop={2}>
            <ForgerPassword />
          </Box>
        </Form>
      </AuthLayout>
    </>
  );
}

function NoAccount() {
  return (
    <Link href="/auth/register" passHref>
      <Typography
        component={"span"}
        align="center"
        color={"primary"}
        variant="body2"
      >
        <FormattedMessage id={"dontHaveAccount"} />
      </Typography>
    </Link>
  );
}

function ForgerPassword() {
  return (
    <Link href="/auth/forget" passHref>
      <Typography
        component={"span"}
        align="center"
        color={"primary"}
        variant="body2"
      >
        <FormattedMessage id={"forgetPassword"} />
      </Typography>
    </Link>
  );
}
