import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
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
import { PageLayout } from "@/layouts";
import { Tabs, Tab } from "@material-ui/core";
import axios from "axios";
import { message } from "antd";

interface Order {
  _id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
}

export default function CreateCategory() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [orders, setOrders] = useState<Order[]>();
  const [value, setValue] = useState(0);
  const [fetching, setFetching] = useState(false);

  const listStatus = ["pending", "delivered", "all"];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (value === newValue) return;
    setValue(newValue);
    setFetching(!fetching);
    setOrders(undefined);
  };

  useEffect(() => {
    const status = listStatus[value];
    axios
      .get(`/api/order/handler/?status=${status}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [fetching]);

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!confirm("هل انت متأكد من حذف هذا الطلب؟")) return;
    message.loading("جاري حذف الطلب ...");
    try {
      await axios.delete(`/api/order/handler/?id=${id}`);
      message.success("تم حذف الطلب بنجاح");
      setFetching(!fetching);
    } catch (error) {
      console.error(error);
      message.error("حدث خطأ أثناء حذف الطلب");
    }
  };
  if (user && user.role !== "admin") return <NotFound />;

  return (
    <>
      <Head>
        <title>الطلبات - كتبي</title>
      </Head>
      <PageLayout title="header.orders">
        <>
          <Tabs
            value={value}
            onChange={(e: any, n: number) => {
              handleChange(e, n);
            }}
            variant="fullWidth"
          >
            <Tab label="قيد الانتضار" />
            <Tab label="الطلبات المستلمة" />
            <Tab label="كل الطلبات" />
          </Tabs>
          {orders ? (
            <>
              {orders.length > 0 ? (
                <TableContainer
                  sx={{
                    marginTop: "20px",
                  }}
                  component={Paper}
                >
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
                                <Link href={`/admin/orders/${order._id}`}>
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
              ) : (
                <NoData description="لا توجد طلبات بعد" />
              )}
            </>
          ) : (
            <>
              <Loading />
            </>
          )}
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
