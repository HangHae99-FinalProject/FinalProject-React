import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import dd from "../../assets/image 35.png";
import { height } from "@mui/system";
import styled from "styled-components";
const MainCard = () => {
  return (
    <Card
      sx={{ Width: "auto" }}
      // style={{ float: "left", width: "200px", margin: "10px" }}
    >
      <CardActionArea sx={{ height: "300px" }}>
        <CardMedia component="img" height="160" src={dd} alt="green iguana" />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            marginTop="34px"
          >
            제목?
          </Typography>
          <Typography variant="body2" color="text.secondary">
            날짜?
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const images = styled.img`
  src: url("");
`;

export default MainCard;
