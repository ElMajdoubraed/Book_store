// update order status

import Head from "next/head";
import { PageLayout } from "@/layouts";
import { useState, useEffect } from "react";
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
} from "@mui/material";
import { Button, IconButton, Typography } from "@material-ui/core";
import { EyeIcon } from "@/components/icons";
import { NoData } from "@/components/empty";
import { CircularLoading as Loading } from "@/components/loading";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { message } from "antd";
import { useRouter } from "next/router";
import axios from "axios";

interface OrderItems {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  cover: string;
}

interface Order {
  _id?: string;
  status?: string;
  totalPrice?: number;
  createdAt?: any;
  orderBy?: string;
  location?: string;
  localStatus?: string;
}

export default function GetOrders() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [orders, setOrders] = useState<OrderItems[]>();
  const [orderDetails, setOrderDetails] = useState<Order>();
  const [clicksTime, setClicksTime] = useState<number>(0);

  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    axios
      .post(`/api/order/handler/?id=${id}`)
      .then((res) => {
        const { data } = res;
        const { items } = data;
        const _orderDetails: Order = {
          _id: data._id,
          status: data.variant,
          localStatus: data.status,
          totalPrice: data.totalPrice,
          createdAt: data.createdAt,
          orderBy: data.orderBy?.name,
          location: data.location,
        };
        filterItems(items);
        setOrderDetails(_orderDetails);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const filterItems = (items: any) => {
    let filtred: OrderItems[] = [];
    items.map((item: any) => {
      const obj = {
        _id: item.book._id,
        price: item.book.price,
        title: item.book.title,
        cover: item.book.cover,
        quantity: item.quantity,
      };
      filtred.push(obj);
    });
    setOrders(filtred);
  };

  const updateOrderStatus = async () => {
    if (clicksTime > 5) message.error("تم الوصول الى الحد الاقصى من التغييرات");
    else {
      await axios.put(`/api/order/handler/?id=${id}`, {
        variant: orderDetails?.status === "pending" ? "delivered" : "pending",
        status: orderDetails?.status === "pending" ? "مكتمل" : "قيد الانتضار",
      });
      if (orderDetails?.status === "pending")
        setOrderDetails({
          ...orderDetails,
          status: "delivered",
          localStatus: "مكتمل",
        });
      else if (orderDetails?.status === "delivered")
        setOrderDetails({
          ...orderDetails,
          status: "pending",
          localStatus: "قيد الانتضار",
        });
      setClicksTime(clicksTime + 1);

      message.success("تم تحديث حالة الطلب بنجاح");
    }
  };

  if (!user || !orderDetails) return <Loading />;
  else {
    if (user.role !== "admin") return <NotFound />;
    if (orders && orders.length === 0)
      return <NoData description="لا توجد طلبات" />;

    return (
      <>
        <Head>
          <title>الطلبات - كتبي</title>
          <meta name="description" content="الطلبات - كتبي" />
        </Head>
        <PageLayout title="header.order">
          <>
            <Grid
              container
              spacing={4}
              sx={{
                display: "flex",
                marginBottom: "2rem",
                justifyContent: "space-between",
              }}
            >
              <Grid item xs={12} md={6}>
                <Typography>
                  حالة الطلب : {orderDetails?.localStatus}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  تاريخ الشراء :{" "}
                  {new Date(orderDetails?.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>المشتري : {orderDetails?.orderBy}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>
                  السعر الجملي : {orderDetails?.totalPrice}
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography>الموقع : {orderDetails?.location}</Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  onClick={updateOrderStatus}
                  variant={
                    orderDetails?.status === "pending"
                      ? "contained"
                      : "outlined"
                  }
                  color={
                    orderDetails?.status === "pending" ? "primary" : "secondary"
                  }
                >
                  {orderDetails?.status === "pending"
                    ? "غير حالة الطلب الى تم التسليم"
                    : "غير حالة الطلب الى قيد الانتضار"}
                </Button>
              </Grid>
            </Grid>
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
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>{order.price * order.quantity}</TableCell>
                        <TableCell className="btn-icons">
                          <IconButton onClick={() => {}}>
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
            <Button
              style={{
                marginTop: "20px",
              }}
              variant="contained"
              onClick={() => window.print()}
              color="secondary"
            >
              طباعة
            </Button>
          </>
        </PageLayout>
      </>
    );
  }
}
