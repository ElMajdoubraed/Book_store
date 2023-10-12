import { Button, Typography } from "@material-ui/core";
import { Container, Paper } from "@mui/material";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>الصفحة غير موجودة - كواكب</title>
        <meta
          name="description"
          content="للأسف لم نتمكن من العثور على الصفحة التي طلبتها. ما رأيك أن تجرب البحث بالموقع؟"
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
            الصفحة غير موجودة
          </Typography>
          <Typography variant="h1" className="mb-5" color="primary">
            404
          </Typography>
          <Typography className="mb-5">
            للأسف لم نتمكن من العثور على الصفحة التي طلبتها. ما رأيك أن تجرب
            البحث بالموقع؟
          </Typography>

          <Button variant="contained" color="primary" href="/">
            أكمل الى الصفحة الرئيسية
          </Button>
        </Paper>
      </Container>
    </>
  );
}
