import { TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Button } from "@material-ui/core";
import { Grid } from "@mui/material";
import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { useState } from "react";
import axios from "axios";
import { message } from "antd";

export default function CreateCategory() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios
      .post("/api/category/", {
        name,
        description,
      })
      .then((res) => {
        window.location.href = `/admin/category`;
      })
      .catch((err) => {
        message.error("حدث خطأ أثناء إنشاء التصنيف");
      });
  };

  if (user && user.role !== "admin") return <NotFound />;
  return (
    <>
      <Head>
        <title>إنشاء تصنيف - كواكب</title>
      </Head>
      <PageLayout title="header.createCategory">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
              <TextInput
                name="name"
                label="اسم التصنيف"
                required
                value={name}
                onChange={setName}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInput
                name="description"
                label="وصف التصنيف"
                required
                multiline
                rows={4}
                value={description}
                onChange={setDescription}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                إنشاء التصنيف
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
