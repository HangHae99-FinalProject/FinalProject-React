import React, { useState } from "react";
import styled from "styled-components";
import rr from "../assets/image 35.png";
import Grid from "../elements/Grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Uploads from "../elements/Upload";

const Write = () => {
  const [is_location, setLocation] = useState("카테고리를 선택해주세요.");
  const [is_open, setIs_open] = useState(false);
  const [selected, setSelected] = useState(false);

  const locations = [
    { id: 1, locationName: "미술/디자인" },
    { id: 2, locationName: "영상" },
    { id: 3, locationName: "배우" },
    { id: 4, locationName: "사진" },
    { id: 5, locationName: "프로그래밍" },
    { id: 6, locationName: "모델" },
    { id: 7, locationName: "성우" },
    { id: 8, locationName: "음향" },
    { id: 9, locationName: "기타" },
  ];
  return (
    <>
      <Profile>
        <div style={{ margin: "auto", width: "130px", height: "130px" }}>
          <img src={rr} alt="profile" />
        </div>
        <p>안녕하세영</p>
      </Profile>
      <Grid margin="5% 0 0 -5%">
        <TitleBox>
          <span>등대에 글쓰기</span>
          <Grid width="20%" is_flex>
            <Btns>임시저장</Btns>
            <Btns>등록</Btns>
          </Grid>
        </TitleBox>

        <Grid is_flex width="70%">
          <LocationBox>
            <Grid
              is_flex
              flex_align="center"
              _onClick={() => setIs_open(true)}
              _className={
                is_location === "위치 설정하기" ? "default" : "active"
              }
            >
              <Grid is_flex flex_align="center">
                {is_location}
                <ArrowDropDownIcon />
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
        </Grid>

        <InputBox placeholder="제목을 적어주세요!" />

        <Uploads />
        <Grid>
          <TextBox placeholder="내용을 적어주세요!" />
          <DateInput placeholder="일정을 입력하세요!" />
          <Grid margin="1% 0 5% 88% " style={{ display: "flex" }}>
            <Btns>삭제</Btns>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const DateInput = styled.input`
  margin-top: 10px;
  display: flex;
  margin-left: 30%;
  height: 20px;
  width: 63.1%;
  font-size: 15px;
  padding: 5px 16px 5px 16px;
  border: 1px solid #c4c4c4;
`;

const TextBox = styled.textarea`
  border: 1px solid #c4c4c4;
  width: 63.1%;
  height: 200px;
  padding: 5px 16px 5px 16px;
  font-size: 16px;

  ::placeholder {
    font-size: 16px;
  }
`;

const LocationBox = styled.div`
  margin-top: 3%;
  display: flex;
  width: 90%;
  border: 1px solid #c4c4c4;
  height: 40px;

  background-color: #fff;
  color: black;
  padding: 5px 16px 5px 16px;

  cursor: pointer;
  .icon {
    margin-right: 5px;
  }
  .active {
    color: black;
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
    margin-top: 3.3%;
    margin-left: -1.2%;
    color: black;
    background-color: #949494;
    border: 1px solid gray;
    border-radius: 6px;
    z-index: 15;
    cursor: pointer;
    p {
      padding: 10px 10px;
      &:hover {
        background-color: gray;
      }
    }
  }
`;

const InputBox = styled.input`
  padding: 5px 16px 5px 16px;
  border: 1px solid #c4c4c4;
  margin-top: 1%;
  margin-bottom: 1%;
  font-size: 16px;
  width: 63%;
  height: 40px;
`;

const TitleBox = styled.div`
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;

  border-bottom: 1px solid #c4c4c4;
  span {
    font-size: 20px;
  }
`;

const Btns = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  margin-left: 10px;
  background: #cecece;
  border: 1px solid #000000;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
`;

const Profile = styled.div`
  margin-top: 5%;
  float: left;
  height: 75vh;
  width: 25%;
  img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid black;
  }
  p {
    font-size: 20px;
    text-align: center;
  }
`;

export default Write;
