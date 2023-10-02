import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
import { message } from "antd";
import axios from "axios";

export default function UserCard(props: any) {
  const { user, currentUser } = props;

  const updateRole = async (id: string, role: string) => {
    if (!confirm("هل أنت متأكد من تغيير دور المستخدم؟")) return;
    await axios.put(`/api/user/handler/?id=${id}`, {
      role: role === "admin" ? "user" : "admin",
    });
    message.success("تم تحديث دور المستخدم بنجاح");
    window.location.reload();
  };

  return (
    <Card className="bg-paper">
      <CardContent>
        <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
          {user.name}
        </Typography>
        <Typography variant="body2">
          <a className="mail-href" href={`mailto:${user.email}`}>
            {user.email}
          </a>
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          disabled={currentUser?.id === user._id}
          onClick={() => updateRole(user._id, user.role)}
          color="secondary"
          variant="outlined"
          fullWidth
        >
          {user.role === "admin" ? "إلغاء دور المسؤول" : "ترقية إلى مسؤول"}
        </Button>
      </CardActions>
    </Card>
  );
}
