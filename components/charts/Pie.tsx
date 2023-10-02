import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { CircularLoading } from "../loading";
import axios from "axios";
const Pie: any = dynamic(
  () => import("@ant-design/charts").then(({ Pie }) => Pie),
  {
    ssr: false,
  }
);
const DemoPie = () => {
  const [booksStats, setBooksStats] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get("/api/stats/book")
      .then((res) => {
        const { data } = res;
        data.map((item: any) => {
          const obj = {
            type: item.book.title,
            value: item.total,
          };
          setBooksStats((booksStats: any) => [...booksStats, obj]);
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const config = {
    appendPadding: 19,
    data: booksStats,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      style: {
        fontSize: 14,
        margin: "4rem",
        textAlign: "center",
        direction: "rtl",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    pieStyle: {
      stroke: "#a38579",
      strokeOpacity: 1,
    },
    color: ["#29221f", "#81322a", "#c45e4c", "#a38579", "#dad7ce"],
  };
  if (loading) return <CircularLoading />;
  return <Pie {...config} />;
};
export default DemoPie;
