import React, { useState } from "react";

import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import TabPanel from "./TabPanel";
import PropTypes from "prop-types";

const ImageSkeleton = () => {
  const [limit, setLimit] = useState(3);
  const [value, setValue] = React.useState(0);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "88px", marginBottom: "94px" }}
      >
        <Skeleton variant="rectangular" width={1100} height={500} />
      </Grid>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "1370px", marginTop: "24px" }}
      >
        <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>나의 프로젝트</Typography>
          {/* 페이지네이션 게시물 수 셀렉터 */}
          <label style={{ fontSize: "14px" }}>
            볼 수 있는 게시물 수 : &nbsp;
            <select
              type="number"
              value={limit}
              onChange={({ target: { value } }) => setLimit(Number(value))}
            >
              <option value="3">3</option>
              <option value="6">6</option>
              <option value="9">9</option>
            </select>
          </label>
          {/* 여기까지 페이지네이션 게시물 수 셀렉터 */}
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "1370px",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          {/* 탭 속성 */}
          <Tabs value={value} aria-label="basic tabs example">
            <Tab
              sx={{ width: "456px", fontSize: "20px", fontWeight: "bold" }}
              label={<Skeleton variant="text" width={67} height={35} />}
            />
            <Tab
              sx={{ width: "456px", fontSize: "20px", fontWeight: "bold" }}
              label={<Skeleton variant="text" width={67} height={35} />}
            />
            <Tab
              sx={{ width: "456px", fontSize: "20px", fontWeight: "bold" }}
              label={<Skeleton variant="text" width={67} height={35} />}
            />
          </Tabs>
          {/* 여기까지 탭 속성 */}
        </Grid>
        {/* 신청중 탭 */}
        <Grid container direction="row" justifyContent="flex-start" alignItems="center">
          <TabPanel value={value} index={0}>
            <Skeleton
              variant="text"
              width={400}
              height={35}
              sx={{ marginLeft: "30px", marginTop: "30px" }}
            />
          </TabPanel>
        </Grid>
        {/* 여기까지 신청중 탭 */}
        {/* 여기까지 모집완료 탭 */}
      </Grid>
    </>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default ImageSkeleton;
