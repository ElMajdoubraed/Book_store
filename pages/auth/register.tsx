import Head from "next/head";
import { AuthLayout } from "@/layouts";
import { Button, Typography } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/styles";
import { PasswordInput, TextInput } from "@/components/inputs";
import { useRef, useState } from "react";
import { register } from "@/hooks/useAuth";
import { Box } from "@mui/material";
import { Alert } from "@material-ui/lab";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from "antd";
import { GoogleAuthButton } from "@/components/button";

const useStyles = makeStyles((theme: any) => ({
  form: {
    marginTop: theme.spacing(3),
    minWidth: "70%",
  },
  button: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
}));

export default function Register() {
  const recaptchaRef: any = useRef();
  const classes = useStyles();
  const router = useRouter();
  const key: any = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  const [verified, setVerified] = useState(null);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (verified === null) {
        setHasError(true);
        message.error(
          "الرجاء التحقق من صحة الريكابتشا أولاً وإعادة المحاولة مرة أخرى"
        );
      } else {
        await register({ name, email, password });
        router.push("/");
      }
    } catch (e) {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>حساب جديد - كتبي</title>
        <meta
          name="description"
          content="قم بتسجيل حسابك في كتبي وابدأ في إنشاء قائمة الطعام الخاصة بك على الإنترنت."
        />
      </Head>
      <AuthLayout>
        <Typography component={"span"} variant="h5">
          <FormattedMessage id={"title.register"} />
        </Typography>
        {hasError && (
          <Box marginTop={2}>
            <Alert severity="error">
              <FormattedMessage id={"error.register"} />
            </Alert>
          </Box>
        )}
        <form className={classes.form} onSubmit={onSubmit}>
          <TextInput
            required
            label="الاسم"
            autoComplete="name"
            onChange={setName}
          />
          <TextInput
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

          <ReCAPTCHA
            className="recaptcha"
            hl="ar"
            ref={recaptchaRef}
            sitekey={key}
            onChange={(e: any) => setVerified(e)}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            <FormattedMessage id={"btn.send"} />
          </Button>
          <GoogleAuthButton />
          <Box marginTop={2}>
            <HaveAccount />
          </Box>
        </form>
      </AuthLayout>
    </>
  );
}

function HaveAccount() {
  return (
    <Link href="/auth/login" passHref>
      <Typography
        component={"span"}
        align="center"
        color={"primary"}
        variant="body2"
      >
        <FormattedMessage id={"haveAccount"} />
      </Typography>
    </Link>
  );
}
