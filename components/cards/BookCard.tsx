import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { AutoStories, RemoveRedEye } from "@mui/icons-material";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { message } from "antd";
import { Dialog } from "@mui/material";
import { EyeIcon } from "../icons";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "scale(1)" : "scale(1.15)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface BookProps {
  _id: string | number;
  title: string;
  story?: string;
  price: string | number;
  cover: string;
  author?: string;
  category?: any;
}

export default function BookCard({
  book,
  forSell = true,
}: {
  book: BookProps;
  forSell?: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToCart = (bookDetails: any) => {
    const book = {
      _id: bookDetails?._id,
      title: bookDetails?.title,
      price: bookDetails?.price,
      cover: bookDetails?.cover,
      quantity: 1,
    };
    const CART_KEY = "cart";
    const LOCAL_ORDERS = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (LOCAL_ORDERS && LOCAL_ORDERS.length > 0) {
      const existingProduct = LOCAL_ORDERS.find(
        (b: Book) => b._id === book._id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        LOCAL_ORDERS.push(book);
      }
    } else {
      LOCAL_ORDERS.push(book);
    }
    localStorage.setItem(CART_KEY, JSON.stringify(LOCAL_ORDERS));
    message.success("تم اضافة الكتاب الى السلة");
  };

  return (
    <Card className="bg-paper">
      <CardHeader
        action={
          <Link className="color-primary" href={`/~/book/${book._id}`}>
            <IconButton aria-label="settings">
              <EyeIcon size={20} fill="#29221f" />
            </IconButton>
          </Link>
        }
        title={
          <Typography
            onClick={() => (window.location.href = `/~/book/${book._id}`)}
          >
            {book.title}
          </Typography>
        }
        subheader={
          typeof book.category === "object"
            ? book.category?.name
            : book.category
        }
      />
      <CardMedia
        sx={{
          marginBottom: "1rem",
        }}
        className="zoom-in book-cover"
        component="img"
        //onMouseOver={() => setOpen(true)}
        onClick={() => setOpen(true)}
        image={uploadUrl + "/" + book.cover}
        object-fit="cover"
        alt={book.title}
      />
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <AutoStories />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {book.story}
          </Typography>
        </CardContent>
      </Collapse>
      {forSell && (
        <Button
          onClick={() => addToCart(book)}
          style={{
            width: "100%",
            borderRadius: "0",
            padding: "0.75rem",
          }}
          className="zoom-in"
          variant="contained"
          color="secondary"
        >
          أضف الى السلة
        </Button>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          src={uploadUrl + "/" + book.cover}
          alt={book.title}
        />
      </Dialog>
    </Card>
  );
}
