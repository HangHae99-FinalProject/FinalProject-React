import React, { useState } from "react";
import styled from "styled-components";
import { Grid } from "../elements/Index";
import FmdGoodIcon from "@mui/icons-material/FmdGood";

const Main = () => {
  const [location, setLocation] = useState("위치 설정하기");
  const [is_open, setIs_open] = useState(false);
  const [selected, setSelected] = useState(false);

  //지역 옵션
  const locations = [
    { id: 1, locationName: "전체" },
    { id: 2, locationName: "동대문구" },
    { id: 3, locationName: "마포구" },
    { id: 4, locationName: "서대문구" },
    { id: 5, locationName: "성북구" },
  ];
  return (
    <>
      {" "}
      <LocationBox>
        <Grid
          is_flex
          flex_align="center"
          _onClick={() => setIs_open(true)}
          _className={location === "위치 설정하기" ? "default" : "active"}
        >
          <FmdGoodIcon className="icon" />
          <Grid is_flex flex_align="center">
            {location}
          </Grid>
        </Grid>
        {is_open && (
          <>
            <Grid _className="location-option">
              {locations.map((loc, i) => {
                return (
                  <p
                    key={loc.id}
                    onClick={() => {
                      setLocation(loc.locationName);
                      setIs_open(false);
                      setSelected(true);
                    }}
                  >
                    {loc.locationName}
                  </p>
                );
              })}
            </Grid>
          </>
        )}
      </LocationBox>
    </>
  );
};

const LocationBox = styled.div`
  position: relative;
  color: var(--inactive-text-color);
  padding: 0px 16px 16px 16px;
  cursor: pointer;
  .icon {
    margin-right: 5px;
  }
  .active {
    color: var(--main-color);
    animation: 0.6s ease-in-out loadEffect3;
  }
  @keyframes loadEffect3 {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    65% {
      opacity: 0.65;
      transform: scale(1.01);
    }
    85% {
      opacity: 0.85;
      transform: scale(0.97);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .location-option {
    width: 140px;
    position: absolute;
    top: 45px;
    left: 25px;
    color: var(--active-color);
    background-color: gray;
    border: 1px solid var(--disabled-color);
    border-radius: 6px;
    z-index: 15;
    cursor: pointer;
    p {
      padding: 10px 10px;
      &:hover {
        background-color: var(--main-light-color);
      }
    }
  }
`;

export default Main;
