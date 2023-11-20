import React from "react";
import { PageLayout } from "@/layouts";
import { Grid, Stack } from "@mui/material";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import { useEffect, useState } from "react";
import NotFound from "@/pages/404";
import { CircularLoading as Loading } from "@/components/loading";
import axios from "axios";
import { useRouter } from "next/router";
import { message } from "antd";
import styled from "styled-components";
import { DeleteIcon, EditIcon } from "@/components/icons";
import Image from "next/image";
import moment from "@/utils/moment";
import { RestartAlt } from "@mui/icons-material";
import { Dialog } from "@mui/material";

interface BookDetails {
  _id: string | number | null;
  title?: string;
  story?: string;
  price?: number;
  category?: {
    name: string;
  };
  author?: string;
  cover?: string;
  createdAt?: string;
}

const BookButton = styled(Button)`
  @media (max-width: 600px) {
    width: 100%;
  }
  width: 100%;
`;

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const [bookDetails, setBookDetails] = useState<BookDetails>();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);

  const handleDelete = () => {
    if (!id) return;
    if (!confirm("هل انت متأكد من حذف الكتاب ؟")) return;
    axios
      .delete(`/api/book/${id}/handler`)
      .then((res) => {
        message.success("تم حذف الكتاب بنجاح");
        window.location.reload();
        //router.push("/admin/books");
      })
      .catch((err) => {
        message.error("حدث خطأ ما");
        console.log(err);
      });
  };

  const handleOrder = () => {
    if (!id) return;
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
    window.location.href = "/~/cart";
  };

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/book/${id}`)
      .then((res) => {
        const { data } = res;
        data ? setBookDetails({ ...data }) : setBookDetails({ _id: null });
      })
      .catch((err) => {
        setBookDetails({
          _id: null,
        });
      });
  }, [id]);

  if (!bookDetails) return <Loading />;
  if (bookDetails && !bookDetails._id) return <NotFound />;
  return (
    <>
      <Head>
        <title>معطيات الكتاب - كواكب</title>
      </Head>
      <PageLayout title="header.book">
        <Grid
          sx={{
            marginTop: 5.5,
          }}
          container
          spacing={2}
        >
          <Grid
            item
            sx={{
              marginBottom: 2.5,
            }}
            xs={12}
            md={12}
          >
            <Stack
              className="responsive__stack"
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
            >
              <div className="spacing">
                <Image
                  className="book__cover drop-shadow-md hover:drop-shadow-xl"
                  src={uploadUrl + "/" + bookDetails.cover}
                  alt={bookDetails.title as string}
                  width={400}
                  height={350}
                  objectFit="cover"
                  unoptimized={true}
                  loading="lazy"
                  onClick={() => setOpen(true)}
                />
              </div>
              <div>
                <Typography
                  className="mb-5 underline decoration-[#81322a]"
                  color="primary"
                  variant="h5"
                >
                  <span className="font-semibold">{bookDetails.title} </span>{" "}
                </Typography>
                <Typography className="mb-5">
                  <span className="font-bold"> اسم المؤلف: </span>
                  {bookDetails.author}
                </Typography>
                <Typography className="mb-5">
                  <span className="font-bold"> التصنيف:</span>{" "}
                  {bookDetails.category?.name}
                </Typography>
                <Typography className="mb-5">
                  <span className="font-bold"> السعر:</span> {bookDetails.price}{" "}
                  $
                </Typography>
                <Typography className="mb-5">
                  <span className="font-bold"> تاريخ النشر:</span>{" "}
                  {moment(bookDetails.createdAt).fromNow()}
                </Typography>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12}>
            <div className="book__story mb-5">
              <Typography className="indent-8">{bookDetails.story}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            {user?.role === "admin" && (
              <Button
                color="primary"
                variant="contained"
                fullWidth
                startIcon={<EditIcon size={20} fill="#ffffff" />}
                onClick={() => router.push(`/admin/book/${id}`)}
              >
                تعديل الكتاب
              </Button>
            )}
            {user?.role === "user" && (
              <></>
              /*
              <Grid item xs={12} className="w-full">
                <ButtonGroup fullWidth>
                  <Button
                    style={{
                      borderRadius: "0px",
                      border: "none",
                    }}
                  >
                    الكمية
                  </Button>
                  <Button
                    className="btn-cart"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      setQuantity((quantity) => quantity + 1);
                    }}
                  >
                    +
                  </Button>
                  <Button
                    className="btn-cart"
                    style={{
                      borderRadius: "0px",
                      border: "none",
                    }}
                  >
                    {quantity}
                  </Button>
                  <Button
                    className="btn-cart"
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity((quantity) => quantity - 1);
                      }
                    }}
                  >
                    -
                  </Button>
                  <Button
                    className="btn-cart"
                    onClick={() => {
                      setQuantity(1);
                    }}
                    startIcon={<RestartAlt />}
                  ></Button>
                </ButtonGroup>
              </Grid>
               */
            )}
          </Grid>
          <Grid item xs={12} md={6} className="mb-5">
            {user?.role === "admin" && (
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                startIcon={<DeleteIcon size={20} fill="#81322a" />}
                onClick={handleDelete}
              >
                حذف الكتاب
              </Button>
            )}
            {user?.role === "user" && (
              <React.Fragment>
                <BookButton
                  onClick={handleOrder}
                  variant="contained"
                  color="primary"
                >
                  اضافة الى السلة
                </BookButton>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <img
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={uploadUrl + "/" + bookDetails.cover}
            alt={bookDetails.title as string}
          />
        </Dialog>
      </PageLayout>
    </>
  );
}
