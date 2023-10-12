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
} from "@mui/material";
import { Button, IconButton } from "@material-ui/core";
import { DeleteIcon, EyeIcon } from "@/components/icons";
import { NoData } from "@/components/empty";
import { CircularLoading as Loading } from "@/components/loading";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { message } from "antd";

interface Order {
  _id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
}

export default function GetOrders() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [orders, setOrders] = useState<Order[]>();
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    axios
      .get("/api/order")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [fetch]);

  const handleDelete = async (id: string) => {
    if (!confirm("هل انت متأكد من حذف الكتاب ؟")) return;
    await axios
      .delete(`/api/order/${id}`)
      .then((res) => setFetch(!fetch))
      .catch((err) => console.error(err));
  };

  if (orders && orders.length === 0)
    return <NoData description="لا توجد طلبات بعد" />;

  if (!orders) return <Loading />;
  return (
    <>
      <Head>
        <title>الطلبات - كواكب</title>
        <meta name="description" content="الطلبات - كواكب" />
      </Head>
      <PageLayout title="header.orders">
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
                  <TableCell>حالة الطلب</TableCell>
                  <TableCell> السعر الجملي</TableCell>
                  <TableCell>تاريخ الشراء</TableCell>
                  <TableCell>...</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {map(orders, (order: Order, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="btn-icons">
                        <IconButton onClick={() => {}}>
                          <Link href={`/~/orders/${order._id}`}>
                            <EyeIcon size={20} fill="#29221f" />
                          </Link>
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleDelete(order._id);
                          }}
                        >
                          <DeleteIcon size={20} fill="#c45e4c" />
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
