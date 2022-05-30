import React from "react";
import _styled from "styled-components";

import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const UserSkeleton = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        marginTop: "14px",
        width: "1370px",
        height: "270px",
        border: "1px solid #c6c6c6",
        borderRadius: "10px",
        padding: "14px",
      }}
    >
      <Grid sx={{ marginLeft: "100px" }}>
        <Grid container direction="column" justifyContent="center" alignItems="center">
          <Profile>
            <Skeleton variant="circular" width={120} height={120} />
          </Profile>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Skeleton variant="text" width={126} height={36} />
          </Grid>
          <Grid sx={{ marginTop: "4px" }}>
            <Skeleton variant="text" width={78} height={23} />
          </Grid>
        </Grid>
      </Grid>
      <Grid sx={{ marginLeft: "160px" }}>
        <Grid>
          <Skeleton variant="rectangular" width={140} height={50} sx={{ borderRadius: "14px" }} />
        </Grid>
        {/* 자기소개 */}
        <Grid sx={{ backgroundColor: "none", width: "900px" }}>
          <Skeleton
            variant="text"
            sx={{
              marginTop: "20px",
              marginLeft: "0px",
              width: "300px",
              backgroundColor: "none",
            }}
          />
        </Grid>
        {/* 여기까지 자기소개 */}
        {/* 포트폴리오링크 */}
        <Grid>
          <Skeleton
            variant="text"
            sx={{
              marginTop: "14px",
              marginLeft: "0px",
              width: "350px",
            }}
          />
        </Grid>
        {/* 여기까지 포트폴리오링크 */}
      </Grid>
    </Grid>
  );
};

const Profile = _styled.div`
  margin-bottom: 19.5px;
  float: left;
  height: auto;
  width: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    max-width: 120px;
    min-width: 120px;
    /* width: 20vw; */
    height: auto;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
`;

export default UserSkeleton;
