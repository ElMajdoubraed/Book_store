import { Button, Typography } from "@material-ui/core";
import { Container, Paper } from "@mui/material";
import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>حدث خطأ ما - كواكب</title>
        <meta
          name="description"
          content="حدث خطأ ما، يرجى المحاولة مرة أخرى."
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
            حدث خطأ ما
          </Typography>

          <Typography className="mb-5">
            حدث خطأ ما، يرجى المحاولة مرة أخرى.
          </Typography>

          <Button variant="contained" color="primary" href="/">
            أكمل الى الصفحة الرئيسية
          </Button>
        </Paper>
      </Container>
    </>
  );
}
