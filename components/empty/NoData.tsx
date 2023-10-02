import { Typography } from "@material-ui/core";
import { Empty } from "antd";

const NoData = (props: any) => (
  <Empty
    style={{
      margin: "auto",
      marginTop: "5rem",
      marginBottom: "5rem",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    }}
    description={
      <Typography
        style={{
          marginTop: "2rem",
          color: "#333D51",
          fontSize: "1rem",
        }}
      >
        {props.description || "لا توجد معطيات بعد"}
      </Typography>
    }
  />
);

export default NoData;
