import React, { useEffect, useState } from "react";
import { AuthLayout } from "@/layouts";
import { Box, Snackbar } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";
import { PasswordInput } from "@/components/inputs";
import { Button, Typography } from "@material-ui/core";
import { reset } from "@/hooks/useAuth";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: any) => ({
  form: {
    marginTop: theme.spacing(3),
    minWidth: "70%",
  },
  invalidCode: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Reset() {
  const classes = useStyles();
  const router = useRouter();
  const { id, token } = router.query;

  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState({ type: "", alert: "" });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (token) {
      try {
        axios
          .get(`/api/auth/forget?token=${token}&id=${id}`)
          .then((res) => {
            setValid(true);
          })
          .catch((e) => {
            setValid(false);
          });
      } catch (e) {
        setValid(false);
      }
    }
  }, [token, id]);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      if (password !== passwordConfirm) {
        setMessage({ type: "error", alert: "كلمة المرور غير متطابقة" });
        setHasError(true);
        setOpen(true);
        setLoading(false);
        return;
      } else {
        await reset({ id, token, password });
        setMessage({ type: "success", alert: "تم تغيير كلمة المرور بنجاح" });
        setHasError(false);
        setOpen(true);
        setLoading(false);
      }
    } catch (e) {
      setHasError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>إعادة تعيين كلمة المرور - كواكب</title>
        <meta
          name="description"
          content="قم بإعادة تعيين كلمة المرور الخاصة بك في كواكب."
        />
      </Head>
      <AuthLayout>
        {valid ? (
          <>
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
              <PasswordInput
                required
                label="كلمة المرور"
                autoComplete="password"
                onChange={setPassword}
              />

              <PasswordInput
                required
                label="تأكيد كلمة المرور"
                autoComplete="confirm-password"
                onChange={setPasswordConfirm}
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
            </form>
          </>
        ) : (
          <form className={classes.invalidCode}>
            <Alert className={classes.invalidCode} severity="error">
              <FormattedMessage id={"error.invalid_token"} />
            </Alert>
            <br />
            <Button variant="contained" color="primary" href="/">
              أكمل الى الصفحة الرئيسية
            </Button>
          </form>
        )}

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            variant="filled"
            severity={message.type as "success" | "info" | "warning" | "error"}
            onClose={handleClose}
          >
            {message.alert}
          </Alert>
        </Snackbar>
      </AuthLayout>
    </>
  );
}
