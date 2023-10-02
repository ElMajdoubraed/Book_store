import Head from "next/head";
import useAuth from "@/hooks/useAuth";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { message } from "antd";

export default function BookUpdatePage() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!id) return;
    axios.get(`/api/book/${id}`).then((res) => {
      const { data } = res;
      setTitle(data?.title);
      setPrice(data?.price);
      setStory(data?.story);
    });
  }, [id]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios
      .put(`/api/book/${id}/handler`, {
        title,
        price,
        story,
      })
      .then((res) => router.push(`/~/book/${id}`))
      .catch((err) => message.error("حدث خطأ"));
  };
  if (user && user.role !== "admin") return <NotFound />;
  return (
    <>
      <Head>
        <title>تعديل كتاب - كتبي</title>
      </Head>
      <PageLayout title="header.updateBook">
        <form onSubmit={handleUpdate}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput
                name="title"
                label="عنوان الكتاب"
                required
                focused
                value={title}
                onChange={setTitle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                name="price"
                label="سعر الكتاب"
                type="number"
                focused
                required
                value={price}
                onChange={setPrice}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInput
                multiline
                focused
                rows={4}
                name="story"
                label="قصة الكتاب"
                required
                value={story}
                onChange={setStory}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                تعديل الكتاب
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
