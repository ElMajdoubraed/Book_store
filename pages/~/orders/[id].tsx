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
  Box,
} from "@mui/material";
import { Button, IconButton, Typography } from "@material-ui/core";
import { EyeIcon } from "@/components/icons";
import { NoData } from "@/components/empty";
import { CircularLoading as Loading } from "@/components/loading";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import axios from "axios";
import { useRouter } from "next/router";

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
}

export default function GetOrders() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;
  const [orders, setOrders] = useState<OrderItems[]>();
  const [orderDetails, setOrderDetails] = useState<Order>();
  const uploadUrl = process.env.NEXT_PUBLIC_S3_UPLOAD_URL;
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/order/${id}`)
      .then((res) => {
        const { data } = res;
        const { items } = data;
        const _orderDetails: Order = {
          _id: data._id,
          status: data.status,
          totalPrice: data.totalPrice,
          createdAt: data.createdAt,
          orderBy: data.orderBy,
        };
        filterItems(items);
        setOrderDetails(_orderDetails);
      })
      .catch((err) => {
        setOrderDetails({
          orderBy: "",
        });
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

  if (!user || !orderDetails) return <Loading />;
  else {
    if (orderDetails && user.id !== orderDetails?.orderBy) return <NotFound />;

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
            <Box
              sx={{
                display: "flex",
                marginBottom: "2rem",
                justifyContent: "space-between",
              }}
            >
              <Typography>الحالة : {orderDetails?.status}</Typography>
              <Typography>
                تاريخ الشراء :{" "}
                {new Date(orderDetails?.createdAt).toLocaleDateString()}
              </Typography>
              <Typography>السعر الجملي : {orderDetails?.totalPrice}</Typography>
            </Box>
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
