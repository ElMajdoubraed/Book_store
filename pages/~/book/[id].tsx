import { PageLayout } from "@/layouts";
import { Grid, Box, Stack } from "@mui/material";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import { Typography, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import NotFound from "@/pages/404";
import { CircularLoading as Loading } from "@/components/loading";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { message } from "antd";

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
}

export default function BookPage() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  const [bookDetails, setBookDetails] = useState<BookDetails>();

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
        <title>معطيات الكتاب - كتبي</title>
      </Head>
      <PageLayout title="header.book">
        <Grid
          sx={{
            marginTop: 5.5,
          }}
          container
          spacing={2}
        >
          <Grid item xs={12} md={12}>
            <Typography
              style={{
                marginBottom: 40,
              }}
              color="secondary"
              variant="h5"
            >
              {bookDetails.title}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              marginBottom: 5.5,
            }}
            xs={12}
            md={12}
          >
            <Stack direction="row" spacing={2}>
              <div className="spacing">
                <img
                  className="book__cover"
                  src={uploadUrl + "/" + bookDetails.cover}
                  alt={bookDetails.title}
                />
              </div>
              <div>
                <Typography className="mb-5">
                  اسم المؤلف: {bookDetails.author}
                </Typography>
                <Typography className="mb-5">
                  التصنيف: {bookDetails.category?.name}
                </Typography>
                <Typography className="mb-5">
                  السعر: {bookDetails.price}
                </Typography>
                <div className="book__story mb-5">
                  <Typography>{bookDetails.story}</Typography>
                </div>
              </div>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {user?.role === "admin" ? (
              <>
                <Box sx={{ flexGrow: 1 }}>
                  <Link href={`/admin/book/${id}`}>
                    <Button
                      style={{
                        marginTop: 40,
                      }}
                      variant="contained"
                      fullWidth
                      color="primary"
                    >
                      تعديل
                    </Button>
                  </Link>
                </Box>
                <Button
                  onClick={handleDelete}
                  style={{
                    marginBottom: 40,
                    marginTop: 10,
                  }}
                  variant="outlined"
                  fullWidth
                  color="secondary"
                >
                  حذف
                </Button>
              </>
            ) : (
              <Button
                onClick={handleOrder}
                style={{
                  marginBottom: 40,
                }}
                variant="contained"
                color="primary"
              >
                اضافة الى السلة
              </Button>
            )}
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}
