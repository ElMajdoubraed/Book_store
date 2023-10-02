import { Button, Typography } from "@material-ui/core";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AuthBackgroundPattern() {
  const router = useRouter();
  const currentLink = router.pathname;
  return (
    <Box
      mt={15}
      sx={{
        flexGrow: 1,
      }}
    >
      <Typography
        component={"h1"}
        variant="h5"
        style={{
          marginBottom: "3rem",
        }}
      >
        مرحبا بك في كتبي
      </Typography>
      <Typography
        component={"span"}
        style={{
          marginBottom: "3rem",
        }}
        variant="body2"
      >
        منصتك الأولى للكتب الإلكترونية العربية والأجنبية
      </Typography>
      <Box mt={5}>
        {currentLink === "/auth/login" ? (
          <Link href="/auth/register">
            <Button variant="outlined" color="secondary">
              سجل الآن
            </Button>
          </Link>
        ) : (
          <Link href="/auth/login">
            <Button variant="outlined" color="secondary">
              تسجيل الدخول
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
