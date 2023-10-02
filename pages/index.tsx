import { useState, useEffect } from "react";
import { DropDownCategories } from "@/components/category";
import { TextInput } from "@/components/inputs";
import { PageLayout } from "@/layouts";
import { Grid, Stack, Divider } from "@mui/material";
import Head from "next/head";
import { CircularLoading as Loading } from "@/components/loading";
import { NoData } from "@/components/empty";
import { map } from "lodash";
import { BookCard } from "@/components/cards";
import { Pagination } from "@material-ui/lab";
import CartButton from "@/components/button";
import { Typography, Button, ButtonGroup } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";

interface Book {
  _id: string | number;
  title: string;
  story?: string;
  price: string | number;
  cover: string;
  author?: string;
  category?: string;
}

const SearchTimeOut = 0; // 0 ms

const buttons = [
  <Button variant="outlined" key="one">
    18
  </Button>,
  <Button variant="outlined" key="two">
    9
  </Button>,
  <Button variant="outlined" key="three">
    6
  </Button>,
];

const AnimatedTypography = styled(Typography)`
  color: #29221f !important;
  animation: bounce 2s;
  animation-iteration-count: 2;
  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-12px);
    }
    100% {
      transform: translateY(0);
    }
  }

  &:hover {
    animation: none;
  }
`;

export default function Home() {
  const [books, setBooks] = useState<Book[]>();
  const [category, setCategory] = useState<string>("");
  const [pages, setPages] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [fetch, setFetch] = useState<boolean>(false);
  const [fetchedTimes, setFetchedTimes] = useState<number>(0);
  const [limit, setLimit] = useState<number>(9);

  const router = useRouter();

  const handleSearch = (value: string) => {
    const delaySearchFn = setTimeout(() => {
      setPage(1);
      setBooks(undefined);
      setSearch(value);
      setFetch(!fetch);
    }, SearchTimeOut);

    return () => clearTimeout(delaySearchFn);
  };
  const handleChangeCategory = (value: string) => {
    if (value === category) return;
    if (value === "all") value = "";
    setPage(1);
    setBooks(undefined);
    setCategory(value);
    setFetch(!fetch);
  };

  const handlePageChange = (event: any, value: number) => {
    if (value === page) return;
    setBooks(undefined);
    setPage(value);
    setFetch(!fetch);
  };

  const handleLimitChange = (currentLimit: number) => {
    if (limit === currentLimit) return;
    setPage(1);
    setBooks(undefined);
    setLimit(currentLimit);
    setFetch(!fetch);
  };
  useEffect(() => {
    axios
      .get(
        `/api/book/main/?page=${page}&category=${category}&search=${search}&limit=${limit}`
      )
      .then((res) => {
        setBooks(res.data?.books);
        setPages(res.data?.pages);
        router.push({
          pathname: "/",
          query: {
            page,
            search,
            limit,
          },
        });
      })
      .catch((err) => {
        const { reload } = router.query;
        if (!reload || Number(reload) < 1) {
          router.push({
            pathname: "/",
            query: {
              page,
              search,
              limit,
              reload: 2,
            },
          });
        } else console.error(err);
      });
  }, [fetch]);

  return (
    <>
      <Head>
        <title>كتبي - مكتبة الكترونية لبيع الكتب العربية والانجليزية</title>
        <meta
          name="description"
          content="مكتبة الكترونية لبيع الكتب العربية والانجليزية"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout title="main">
        <AnimatedTypography
          align="center"
          style={{
            marginBottom: "40px",
          }}
          gutterBottom
        >
          مرحبا بك في مكتبتك الخاصة
        </AnimatedTypography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={9}>
            <TextInput label="البحث عن كتاب" onChange={handleSearch} />
          </Grid>
          <Grid className="top-45" item xs={12} md={3}>
            <DropDownCategories
              getAllCategories={true}
              setCategory={(value: string) => handleChangeCategory(value)}
              selectedCategory={category}
            />
          </Grid>
          {!books ? (
            <Loading />
          ) : books.length > 0 ? (
            map(books, (book: Book, index: number) => (
              <Grid item xs={12} md={4} key={index}>
                <BookCard book={book} />
              </Grid>
            ))
          ) : (
            <NoData />
          )}
        </Grid>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          marginTop={10}
          spacing={2}
        >
          <ButtonGroup
            onClick={(e: any) => handleLimitChange(Number(e.target.innerText))}
          >
            {buttons}
          </ButtonGroup>
          <Pagination
            dir="ltr"
            onChange={(e, i) => {
              handlePageChange(e, i);
              console.log(page);
            }}
            count={pages}
            defaultPage={page}
            page={page}
            shape="rounded"
            color="primary"
          />
        </Stack>
      </PageLayout>

      <CartButton />
    </>
  );
}
