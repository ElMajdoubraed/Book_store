import React from "react";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { Tabs, Tab } from "@material-ui/core";
import { UserCard } from "@/components/cards";
import { map } from "lodash";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";

interface UserProps {
  name: string;
  email: string;
  role: string;
  _id: string;
}
export default function UsersPage({ users }: { users: UserProps[] }) {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const [value, setValue] = React.useState(0);
  const [filteredUsers, setFilteredUsers] = React.useState(users);

  const handleChange = (event: React.SyntheticEvent, value: number) => {
    setValue(value);
    if (value === 0) setFilteredUsers(users);
    else if (value === 1) setFilteredUsers(filterUsers(users, "user"));
    else if (value === 2) setFilteredUsers(filterUsers(users, "admin"));
  };

  const filterUsers = (users: UserProps[], role: string) => {
    return users.filter((user) => user.role === role);
  };
  if (user && user.role !== "admin") return <NotFound />;
  return (
    <>
      <Head>
        <title>قائمة المستخدمين - كتبي</title>
      </Head>
      <PageLayout title="header.users">
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Tabs
              value={value}
              onChange={(e: any, n: number) => {
                handleChange(e, n);
              }}
              variant="fullWidth"
            >
              <Tab label="جميع المستخدمين" />
              <Tab label="قائمة المستخدمين " />
              <Tab label="قائمة المسؤولين" />
            </Tabs>
          </Grid>
          <Grid
            sx={{
              marginTop: "20px",
            }}
            item
            xs={12}
            md={12}
          >
            <Grid container spacing={2}>
              {map(filteredUsers, (_user: UserProps, index) => {
                return (
                  <Grid key={index} item xs={12} md={3}>
                    <UserCard currentUser={user} user={_user} />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </PageLayout>
    </>
  );
}

export const getStaticProps = async (ctx: any) => {
  await dbConnect();
  const users = await User.find(
    {},
    {
      password: 0,
    }
  );
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
};
