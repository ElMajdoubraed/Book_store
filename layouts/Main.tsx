import { Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import { motion } from "framer-motion";
import Footer from "./partials/Footer";
import Header from "./partials/Header";

const useStyles: any = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    marginBottom: "4rem",
    marginTop: "4rem",
  },
  title: {
    padding: "2rem",
  },
  content: {
    flexGrow: 1,
    borderBottom: "none",
  },
}));

export default function Main({ children, title }: any) {
  const classes: any = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="lg" component="main" className={classes.container}>
        <motion.div
          initial={{
            x: -200,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1.2,
          }}
          className={classes.content}
        >
          {children}
        </motion.div>
      </Container>
      <Footer />
    </div>
  );
}
