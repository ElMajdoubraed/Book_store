import { useEffect, useState } from "react";
import Head from "next/head";
import { makeStyles, Button, Grid } from "@material-ui/core";
import { Snackbar } from "@mui/material";
import { Alert } from "@material-ui/lab";
import { PageLayout } from "@/layouts";
import { PasswordInput, TextInput } from "@/components/inputs";
import { FormattedMessage } from "react-intl";
import useAuth from "@/hooks/useAuth";
import { updateProfile, updatePassword } from "@/hooks/useUser";

const useStyles = makeStyles((theme) => ({
  form: {
    margin: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  alert: {
    marginBottom: theme.spacing(2),
  },
  colorprimary: {
    color: theme.palette.primary.main,
  },
  root: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Profile() {
  const classes = useStyles();

  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const [profileData, setProfileData] = useState() as any;
  const [open, setOpen] = useState(false);
  const [passwordData, setPasswordData] = useState();
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    picture: false,
  });
  const [error, setError] = useState({ profile: false, password: false });
  const [message, setMessage] = useState({ type: "", alert: "" });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  useEffect(() => {
    if (!user) return;
    const { name, email } = user;
    setProfileData({ name, email });
  }, [user]);

  const onSubmitProfile = async (event: any) => {
    event.preventDefault();
    setLoading({ ...loading, profile: true });
    try {
      await updateProfile(profileData);
      setOpen(true);
      setMessage({ type: "success", alert: "تم تحديث الملف الشخصي" });
      setError({ ...error, profile: false });
    } catch (e) {
      setOpen(false);
      setError({ ...error, profile: true });
    }
    setLoading({ ...loading, profile: false });
  };

  const onSubmitPassword = async (event: any) => {
    event.preventDefault();
    setLoading({ ...loading, password: true });
    try {
      await updatePassword(passwordData);
      setMessage({ type: "success", alert: "تم تحديث كلمة المرور" });
      setOpen(true);
      setError({ ...error, password: false });
    } catch (e) {
      setOpen(false);
      setError({ ...error, password: true });
    }
    setLoading({ ...loading, password: false });
  };

  return (
    <PageLayout title="title.profile">
      <Head>
        <title>تعديل الملف الشخصي - كواكب</title>
        <meta name="description" content="قم بتحديث ملفك الشخصي في كواكب." />
      </Head>

      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          {user && (
            <form className={classes.form} onSubmit={onSubmitProfile}>
              <TextInput
                required
                label="الاسم"
                value={profileData?.name}
                variant="outlined"
                onChange={(name) => setProfileData({ ...profileData, name })}
              />

              <TextInput
                required
                label="البريد الإلكتروني"
                value={profileData?.email}
                type="email"
                variant="outlined"
                onChange={(email) => setProfileData({ ...profileData, email })}
              />
              {error.profile && (
                <Alert severity="error">
                  <FormattedMessage id="error.update_profile" />
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading.profile}
              >
                <FormattedMessage id={"btn.save"} />
              </Button>
            </form>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          {user && (
            <form className={classes.form} onSubmit={onSubmitPassword}>
              <PasswordInput
                name="password"
                label="كلمة المرور الحالية"
                autoComplete="password"
                onChange={(password) =>
                  setPasswordData({ ...(passwordData as any), password })
                }
              />

              <PasswordInput
                required
                name="newPassword"
                label="كلمة المرور الجديدة"
                autoComplete="newPassword"
                onChange={(newPassword) =>
                  setPasswordData({ ...(passwordData as any), newPassword })
                }
              />

              {error.password && (
                <Alert severity="error" className={classes.alert}>
                  <FormattedMessage id="error.update_password" />
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading.password}
              >
                <FormattedMessage id={"btn.change_password"} />
              </Button>
            </form>
          )}
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          variant="filled"
          severity={message.type as "success" | "info" | "warning" | "error"}
          onClose={handleClose}
          className={classes.alert}
        >
          {message.alert}
        </Alert>
      </Snackbar>
    </PageLayout>
  );
}
