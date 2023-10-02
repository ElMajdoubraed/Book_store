import axios from "axios";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Column: any = dynamic(
  () => import("@ant-design/plots").then(({ Column }) => Column),
  {
    ssr: false,
  }
);

const DemoColumn = () => {
  const [users, setUsers] = useState(0);
  const [admins, setAdmins] = useState(0);
  useEffect(() => {
    axios
      .get("/api/user/handler")
      .then((res) => {
        const { data } = res;
        const { users, admins } = data;
        setUsers(users);
        setAdmins(admins);
      })
      .catch((err) => console.error(err));
  }, []);

  const data = [
    {
      users: "المستخدمين",
      number: users,
    },
    {
      users: "المشرفين",
      number: admins,
    },
  ];
  const config = {
    data,
    xField: "users",
    yField: "number",
    label: {
      position: "middle",
      style: {
        fill: "#dad7ce",
        opacity: 1,
      },
    },
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    meta: {
      users: {
        alias: "نوع العضوية",
      },
      number: {
        alias: "عدد الأعضاء",
      },
    },
    color: ({ users }: any) => {
      if (users === "المستخدمين") {
        return "#c45e4c";
      }
      return "#81322a";
    },
  };
  return <Column {...config} />;
};

export default DemoColumn;
