import { DashboardCard } from "@/components/cards";
import { ColumnChart, LineChart, PieChart } from "@/components/charts";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { Button, Typography } from "@material-ui/core";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import Order from "@/models/order";
import Category from "@/models/category";
import Book from "@/models/book";

export default function DashboardPage({
  usersCount,
  ordersCount,
  categoriesCount,
  booksCount,
}: {
  usersCount: number;
  ordersCount: number;
  categoriesCount: number;
  booksCount: number;
}) {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  if (user && user.role !== "admin") return <NotFound />;
  return (
    <>
      <Head>
        <title>لوحة التحكم - كتبي</title>
      </Head>
      <PageLayout title="header.dashboard">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <DashboardCard
              button={
                <Link href="/admin/category/create">
                  <Button variant="outlined" color="primary">
                    إضافة صنف
                  </Button>
                </Link>
              }
              title="عدد الأصناف"
              statstic={categoriesCount}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard
              title="عدد المستخدمين"
              statstic={usersCount}
              button={
                <Link href="/admin/users">
                  <Button variant="contained" color="primary">
                    عرض المستخدمين
                  </Button>
                </Link>
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard
              title="عدد الطلبات"
              statstic={ordersCount}
              button={
                <Link href="/admin/orders">
                  <Button variant="outlined" color="secondary">
                    عرض الطلبات
                  </Button>
                </Link>
              }
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DashboardCard
              title="عدد الكتب"
              statstic={booksCount}
              button={
                <Link href="/admin/book/create">
                  <Button variant="contained" color="secondary">
                    إضافة كتاب
                  </Button>
                </Link>
              }
            />
          </Grid>
        </Grid>
        <Grid
          sx={{
            marginTop: 10,
          }}
          container
          spacing={2}
        >
          <Grid item xs={12} md={6}>
            <Typography>أكثر الكتب مبيعاً</Typography>
            <PieChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <ColumnChart />
          </Grid>
          <Grid
            sx={{
              marginTop: 20,
            }}
            item
            xs={12}
            md={12}
          >
            <LineChart />
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}

export const getServerSideProps = async (ctx: any) => {
  await dbConnect();
  const usersCount = await User.count();
  const ordersCount = await Order.count();
  const categoriesCount = await Category.count();
  const booksCount = await Book.count();
  return {
    props: {
      usersCount,
      ordersCount,
      categoriesCount,
      booksCount,
    },
  };
};
