import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

interface CardProps {
  title?: string;
  button?: React.ReactNode;
  statstic?: number;
}

const AnimatedCounterTypography = styled(Typography)`
  color: #29221f !important;
  animation: bounce 1.5s;
  animation-iteration-count: 4;
  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.3);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    animation: none;
  }
`;

export default function DashboardAdminCard({
  title,
  button,
  statstic,
}: CardProps) {
  return (
    <Card
      className="bg-paper"
      sx={{
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <AnimatedCounterTypography align="center" color="maroon">
            {statstic ? statstic : 0}
          </AnimatedCounterTypography>
        </CardContent>
        <CardActions>{button}</CardActions>
      </Box>
    </Card>
  );
}
