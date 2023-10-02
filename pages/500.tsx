import { Button, Typography } from "@material-ui/core";
import { Container, Paper } from "@mui/material";
import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>خطأ في الخادم الداخلي - كتبي</title>
        <meta
          name="description"
          content="واجه الخادم حالة غير متوقعة منعته من تلبية الطلب الرجاء المحاولة مرة
          أخرى ."
        />
      </Head>
      <Container
        sx={{
          marginTop: "2rem",
          marginBottom: "2rem",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Paper
          sx={{
            padding: "2rem",
            paddingBottom: "4rem",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
          }}
        >
          <Typography className="mb-5" variant="h5">
            خطأ في الخادم الداخلي{" "}
          </Typography>
          <Typography variant="h1" className="mb-5" color="primary">
            500
          </Typography>
          <Typography className="mb-5">
            واجه الخادم حالة غير متوقعة منعته من تلبية الطلب الرجاء المحاولة مرة
            أخرى .
          </Typography>

          <Button variant="contained" color="primary" href="/">
            أكمل الى الصفحة الرئيسية
          </Button>
        </Paper>
      </Container>
    </>
  );
}
