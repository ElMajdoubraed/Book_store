// get books for this category with search and update and delete button

import { PageLayout } from "@/layouts";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { NoData } from "@/components/empty";
import { map } from "lodash";
import NotFound from "@/pages/404";
import useAuth from "@/hooks/useAuth";
import { CircularLoading as Loading } from "@/components/loading";
import { Grid } from "@mui/material";
import { TextInput } from "@/components/inputs";
import { DropDownCategories } from "@/components/category";
import { BookCard } from "@/components/cards";
import { useRouter } from "next/router";
import axios from "axios";

interface Book {
  _id: string | number;
  title: string;
  story?: string;
  price: string | number;
  cover: string;
  author?: string;
  category?: any;
}

export default function AdminCategory() {
  const { user } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const [booksCategory, setBooksCategory] = useState<Book[]>();
  const [auxBooksCategory, setAuxBooksCategory] = useState<Book[]>(); // for search
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/book/${id}/handler`)
      .then((res) => {
        setBooksCategory(res.data);
        setAuxBooksCategory(res.data);
      })
      .catch((err) => console.error(err));
  }, [fetching, id]);
  const handleSearch = (keyWord: string) => {
    if (!keyWord) {
      setBooksCategory(auxBooksCategory);
      return;
    }
    const filteredBooks = auxBooksCategory?.filter((book: Book) =>
      book.title.toLocaleLowerCase().includes(keyWord.toLocaleLowerCase())
    );
    setBooksCategory(filteredBooks);
  };
  if (user && user.role !== "admin") return <NotFound />;
  if (!booksCategory) return <Loading />;
  return (
    <>
      <Head>
        <title>كواكب - مكتبة الكترونية لبيع الكتب العربية والانجليزية</title>
      </Head>
      <PageLayout title="header.category">
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <TextInput
              label="البحث عن كتاب"
              onChange={(value) => {
                handleSearch(value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DropDownCategories
              setCategory={(e) => {
                setBooksCategory(undefined);
                router.push(`/admin/category/${e}`);
              }}
              selectedCategory={id as string}
            />
          </Grid>
          {booksCategory?.length > 0 ? (
            map(booksCategory, (book: Book, index: number) => (
              <Grid item xs={12} md={3} key={index}>
                <BookCard book={book} forSell={false} />
              </Grid>
            ))
          ) : (
            <NoData description="لا يوجد كتب ضمن هذا التصنيف" />
          )}
        </Grid>
      </PageLayout>
    </>
  );
}
