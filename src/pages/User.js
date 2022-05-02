import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const User = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Grid sx={{ marginTop: "62px" }}>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "80vw" },
          }}
          noValidate
          autoComplete="off"
        >
          <Grid>
            <TextField
              id="myMajor"
              label="전공"
              defaultValue="시각 디자인"
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid>
            <TextField
              id="myIntro"
              label="나의 소개"
              multiline
              defaultValue="편집몰, 브랜딩, UXUI를 집중적으로 하고 있습니다. 저의 작품은 주로 차분하고 심플합니다. 제 포트폴리오를 확인해주세요. 개인적으로 개발자분과 협업을 하고 싶습니다."
              InputProps={{
                readOnly: true,
              }}
              sx={{ marginTop: "24px" }}
            />
          </Grid>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="스크랩 확인" {...a11yProps(0)} />
            <Tab label="내 등대 확인" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {itemData1.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Grid>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {itemData2.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>{" "}
        </TabPanel>
      </Grid>
    </Container>
  );
};

const itemData1 = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
];
const itemData2 = [
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
];

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default User;
