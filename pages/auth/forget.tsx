import Head from "next/head";
import { AuthLayout } from "@/layouts";
import { Button, Typography } from "@material-ui/core";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { makeStyles } from "@material-ui/styles";
import { TextInput } from "@/components/inputs";
import { useRef, useState } from "react";
import { forget } from "@/hooks/useAuth";
import { Box } from "@mui/material";
import { Alert } from "@material-ui/lab";
import ReCAPTCHA from "react-google-recaptcha";
import { message } from "antd";

const useStyles = makeStyles((theme: any) => ({
  form: {
    marginTop: theme.spacing(3),
    minWidth: "70%",
  },
}));

export default function Register() {
  const recaptchaRef: any = useRef();
  const classes = useStyles();
  const key: any = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

  const [verified, setVerified] = useState(null);
  const [email, setEmail] = useState();
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
        message.loading("جاري إرسال رابط إعادة تعيين كلمة المرور");
        await forget({ email });
        message.success(
          "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
        );
      }
    } catch (e) {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>نسيت كلمة المرور - كواكب</title>
        <meta
          name="description"
          content="قم بإعادة تعيين كلمة المرور الخاصة بك في كواكب."
        />
      </Head>
      <AuthLayout>
        <Typography component={"span"} variant="h5">
          <FormattedMessage id={"title.forget"} />
        </Typography>
        {hasError && (
          <Box marginTop={2}>
            <Alert severity="error">
              <FormattedMessage id={"error.update_password"} />
            </Alert>
          </Box>
        )}
        <form className={classes.form} onSubmit={onSubmit}>
          <TextInput
            required
            label="البريد الإلكتروني"
            type="email"
            autoComplete="email"
            onChange={setEmail}
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
          <Box marginTop={2}>
            <HaveAccount />
          </Box>
          <Box marginTop={2}>
            <Main />
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

function Main() {
  return (
    <Link href="/" passHref>
      <Typography
        component={"span"}
        align="center"
        color={"primary"}
        variant="body2"
      >
        <FormattedMessage id={"main"} />
      </Typography>
    </Link>
  );
}
