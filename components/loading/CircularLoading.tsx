import { Box } from "@mui/material";
import { CircularProgress } from "@material-ui/core";
import Head from "next/head";
export function CircularLoading() {
  return (
    <>
      <Head>
        <title>جاري التحميل - كواكب</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "5rem",
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
}
