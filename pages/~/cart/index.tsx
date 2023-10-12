import Head from "next/head";
import { PageLayout } from "@/layouts";
import React, { useState, useEffect } from "react";
import map from "lodash/map";
import {
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Grid,
  ButtonGroup,
} from "@mui/material";
import { Button, IconButton, TextField, Typography } from "@material-ui/core";
import { DeleteIcon, EyeIcon } from "@/components/icons";
import { NoData } from "@/components/empty";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { message } from "antd";
import axios from "axios";

interface OrderItems {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  cover: string;
}

const calculateTotalPrice = (orders: OrderItems[] | undefined) => {
  let total = 0;
  if (!orders) return total;
  orders.forEach((order: OrderItems) => {
    total += Number(order.quantity) * Number(order.price);
  });
  return total;
};

export default function Cart() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [orders, setOrders] = useState<OrderItems[]>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderLocation, setOrderLocation] = useState("");
  const CART_KEY = "cart";
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;

  useEffect(() => {
    const CART_KEY = "cart";
    const _orders: OrderItems[] = JSON.parse(
      localStorage.getItem(CART_KEY) || "[]"
    );
    setOrders(_orders);
  }, []);

  useEffect(() => {
    setTotalPrice(calculateTotalPrice(orders));
  }, [orders]);

  const handleDelete = (bookId: string) => {
    if (!orders) return;
    if (!confirm("هل انت متأكد من حذف الكتاب ؟")) return;
    const LOCAL_ORDERS = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const newOrders = LOCAL_ORDERS.filter((b: Book) => b._id !== bookId);
    if (newOrders && newOrders.length > 0) {
      localStorage.setItem(CART_KEY, JSON.stringify(newOrders));
      setOrders(newOrders);
    } else {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
      setOrders([]);
    }
    message.success("تم حذف الكتاب بنجاح");
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (!orders) return;
    const LOCAL_ORDERS = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    const newOrders = LOCAL_ORDERS.map((b: Book) => {
      if (b._id === bookId) {
        b.quantity = quantity;
      }
      return b;
    });
    localStorage.setItem(CART_KEY, JSON.stringify(newOrders));
    setOrders(newOrders);
  };

  const handleOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;
    if (!orders) return;

    const filteredOrders = orders.map((order: OrderItems) => {
      return {
        book: order._id,
        quantity: order.quantity,
      };
    });

    await axios
      .post("/api/order", {
        items: filteredOrders,
        location: orderLocation,
        totalPrice,
      })
      .then((res) => {
        if (res.status === 200) {
          message.success("تم ارسال الطلب بنجاح");
          localStorage.setItem(CART_KEY, JSON.stringify([]));
          setOrders([]);
          window.location.href = "/~/orders";
        }
      })
      .catch((err) => {
        message.error("حدث خطأ ما");
      });
  };

  if (orders && orders.length === 0)
    return <NoData description="لا توجد طلبات" />;
  return (
    <>
      <Head>
        <title>الطلبات - كواكب</title>
        <meta name="description" content="الطلبات - كواكب" />
      </Head>
      <PageLayout title="header.cart">
        <>
          <TableContainer component={Paper}>
            <Table
              aria-label="Orders table"
              sx={{
                minWidth: "100%",
                direction: "rtl",
                ":lang": {
                  direction: "rtl",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>الغلاف</TableCell>
                  <TableCell>عنوان الكتاب</TableCell>
                  <TableCell>سعر الكتاب</TableCell>
                  <TableCell>الكمية</TableCell>
                  <TableCell>السعر الجملي</TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {map(orders, (order: OrderItems, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <img
                          src={uploadUrl + "/" + order.cover}
                          alt={order.title}
                          style={{
                            width: "40px",
                            maxWidth: "40px",
                            maxHeight: "40px",
                            height: "40px",
                            objectFit: "cover",
                          }}
                        />
                      </TableCell>
                      <TableCell>{order.title}</TableCell>
                      <TableCell>{order.price}</TableCell>
                      <TableCell>
                        {order.quantity}
                        <ButtonGroup orientation="horizontal">
                          <Button
                            className="btn-cart"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setOrders((orders: any) => {
                                const newOrders = [...orders];
                                newOrders[index].quantity += 1;
                                return newOrders;
                              });
                              updateQuantity(order._id, order.quantity);
                            }}
                          >
                            +
                          </Button>
                          <Button
                            className="btn-cart"
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                              setOrders((orders: any) => {
                                const newOrders = [...orders];
                                newOrders[index].quantity > 1
                                  ? (newOrders[index].quantity -= 1)
                                  : null;
                                return newOrders;
                              });
                              updateQuantity(order._id, order.quantity);
                            }}
                          >
                            -
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell>{order.price * order.quantity}</TableCell>
                      <TableCell className="btn-icons">
                        <IconButton
                          onClick={() => {
                            handleDelete(order._id);
                          }}
                        >
                          <DeleteIcon size={20} fill="#c45e4c" />
                        </IconButton>
                        <IconButton>
                          <Link href={`/~/book/${order._id}`}>
                            <EyeIcon size={20} fill="#29221f" />
                          </Link>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <form onSubmit={handleOrder}>
            <Grid
              sx={{
                marginTop: "2rem",
              }}
              container
              alignItems={"center"}
              justifyContent={"center"}
            >
              {" "}
              <Grid
                item
                sx={{
                  marginBottom: "1rem",
                }}
                xs={12}
                md={5}
              >
                <TextField
                  fullWidth
                  label="العنوان"
                  required
                  multiline
                  variant="outlined"
                  placeholder="العنوان"
                  onChange={(e) => {
                    setOrderLocation(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  marginBottom: "1rem",
                }}
                item
                xs={12}
                md={4}
              >
                <Typography align="center">
                  السعر الجملي: {totalPrice}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  تأكيد الطلب
                </Button>
              </Grid>
            </Grid>
          </form>
        </>
      </PageLayout>
    </>
  );
}
