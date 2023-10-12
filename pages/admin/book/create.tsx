import Head from "next/head";
import NotFound from "@/pages/404";
import { PageLayout } from "@/layouts";
import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { Button } from "@material-ui/core";
import { DropDownCategories } from "@/components/category";
import { ImageInput } from "@/components/inputs/ImageInput";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { uploadFile } from "@/hooks/useUpload";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { message } from "antd";
import { useRouter } from "next/router";

export default function BookCreatePage() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [story, setStory] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      message.loading("جاري إضافة الكتاب");
      if (!category || category?.length === 0)
        return message.error("يجب إختيار تصنيف الكتاب");
      const uuid = uuidv4();
      await uploadFile(image, `books/cover/${uuid}${".png"}`);
      await axios
        .post("/api/book", {
          title,
          author,
          category,
          price,
          story,
          cover: `books/cover/${uuid}${".png"}`,
        })
        .then((res) => {
          console.log(res);
          message.success("تم إضافة الكتاب بنجاح");
          const { data } = res;
          router.push(`/~/book/${data}`);
        })
        .catch(() => {
          message.error("حدث خطأ أثناء إضافة الكتاب");
        });
    } catch (error) {
      message.error("حدث خطأ أثناء إضافة الكتاب");
    }
  };

  if (user && user.role !== "admin") return <NotFound />;
  return (
    <>
      <Head>
        <title>إضافة كتاب جديد - كواكب</title>
      </Head>
      <PageLayout title="header.addBook">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextInput
                name="title"
                label="عنوان الكتاب"
                required
                value={title}
                onChange={setTitle}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                name="author"
                value={author}
                label="اسم المؤلف"
                onChange={setAuthor}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DropDownCategories
                setCategory={setCategory}
                selectedCategory={category}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextInput
                name="price"
                label="سعر الكتاب"
                type="number"
                required
                value={price}
                onChange={setPrice}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextInput
                multiline
                rows={4}
                name="story"
                label="قصة الكتاب"
                required
                value={story}
                onChange={setStory}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <ImageInput
                name="image"
                label="صورة الكتاب"
                setImageFunction={setImage}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <Button type="submit" variant="contained" color="primary">
                إضافة الكتاب
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageLayout>
    </>
  );
}
