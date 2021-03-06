import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Uploads from "../elements/Upload";
import { BiX } from "react-icons/bi";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { actionCreates as RecruitActions } from "../redux/modules/recruit";
import { actionCreates as PostActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import Footer from "../elements/Footer";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Write = () => {
  const dispatch = useDispatch();

  const [is_location, setLocation] = useState("");
  const [selected, setSelected] = useState(false);
  const [is_Week, setWeek] = useState("");
  const [is_cate, setIs_Cate] = useState("");
  const [is_people, setIs_People] = useState("");
  const [is_title, setIs_Title] = useState("");
  const [is_content, setIs_Content] = useState("");

  const majorList = useSelector((state) => state.recruit.majorList);
  const link = useSelector((state) => state.image.Url);

  const pathName = useLocation();

  const data = {
    content: is_content,
    title: is_title,
    deadline: is_Week,
    region: is_location,
    majorList,
    link,
  };

  const TitleHandleChange = (event) => {
    setIs_Title(event.target.value);
  };

  const ContentHandleChange = (event) => {
    setIs_Content(event.target.value);
  };

  const WeekHandleChange = (event) => {
    setWeek(event.target.value);
  };

  const RegionHandleChange = (event) => {
    setLocation(event.target.value);
  };

  const PeopleHandleChange = (event) => {
    setIs_People(event.target.value);
  };

  const DeleteMajor = (id) => {
    dispatch(RecruitActions.deleteRecruit(id));
  };

  const PeopleBtn = () => {
    const CheckMajor = majorList.map((a) => a.majorName);

    if (is_cate === "" && is_people === "") {
      Swal.fire({
        title: "??????????????? ????????? ????????? ?????????!",
        icon: "warning",
      });

      return;
    }
    if (is_cate === "") {
      Swal.fire({
        title: "??????????????? ????????? ?????????!",
        icon: "warning",
      });

      return;
    }
    if (is_people === "") {
      Swal.fire({
        title: "??????????????? ????????? ?????????!",
        icon: "warning",
      });

      return;
    }
    for (let i = 0; i < CheckMajor.length; i++) {
      if (is_cate === CheckMajor[i]) {
        Swal.fire({
          title: "?????? ?????? ????????? ????????????!",
          icon: "warning",
        });

        return;
      }
    }
    dispatch(
      RecruitActions.serRecruit({
        majorName: is_cate,
        numOfPeopleSet: Number(is_people),
      })
    );
  };

  const PostDetailBtn = () => {
    if (data.title === "") {
      Swal.fire({
        title: "????????? ??????????????????!",
        icon: "warning",
      });

      return;
    }
    if (data.deadline === "") {
      Swal.fire({
        title: "?????? ????????? ????????? ?????????!",
        icon: "warning",
      });
      return;
    }
    if (data.region === "") {
      Swal.fire({
        title: "????????? ??????????????????!",
        icon: "warning",
      });

      return;
    }
    if (data.majorList.length === 0) {
      Swal.fire({
        title: "???????????? ????????? ???????????????!",
        icon: "warning",
      });
      return;
    }
    if (data.content === "") {
      Swal.fire({
        title: "????????? ??????????????????!",
        icon: "warning",
      });

      return;
    }
    dispatch(PostActions.__addPost(data));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return (
    <>
      <Container>
        {/* ?????? ?????? */}
        <HeaderText>
          <span style={{ fontWeight: "700" }}>????????? ???????????????</span>
        </HeaderText>

        {/* ?????? ?????? */}
        <TitleBox>
          <Text bold size="23px" margin="0 4.9% 0 20px">
            ??????
          </Text>
          <InputBox
            placeholder="????????? ???????????????!"
            maxLength={40}
            value={is_title}
            onChange={TitleHandleChange}
          />
        </TitleBox>

        {/* ????????????/ ?????? */}
        <DropBox>
          <Text bold size="23px" margin="0 1.8% 0 15px">
            ????????????
          </Text>

          <FormControl sx={{ width: "33.5rem" }}>
            <Select
              value={is_Week}
              onChange={WeekHandleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ height: "50px", fontSize: "20px" }}
            >
              <MenuItem value="" style={{ fontSize: "20px" }}>
                <em>??????????????? ??????????????????.</em>
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"1???"}>
                1???
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"2???"}>
                2???
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"3???"}>
                3???
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"4???"}>
                4???
              </MenuItem>
            </Select>
          </FormControl>

          <Text bold size="23px" margin="0 70px 0 50px">
            ??????
          </Text>

          <FormControl sx={{ width: "33.5rem" }}>
            <Select
              value={is_location}
              onChange={RegionHandleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ height: "50px", fontSize: "20px" }}
            >
              <MenuItem value="" style={{ fontSize: "20px" }}>
                <em>????????? ??????????????????.</em>
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????/??????"}>
                ??????/??????
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>

              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"??????"}>
                ??????
              </MenuItem>
            </Select>
          </FormControl>
        </DropBox>

        {/* ???????????? ?????? */}
        <Text margin="2% 0 0 1%" size="17px" color="rgba(112, 112, 112, 1)">
          ?????? ????????? ????????? ??????????????????!
        </Text>

        <Category>
          <CateBtn
            onClick={() => {
              is_cate === "?????????" ? setIs_Cate("") : setIs_Cate("?????????");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "?????????" ? "active" : "default"}
              bg={is_cate === "?????????" ? "#2967AC" : "#f5fcff"}
            >
              <p>?????????</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "??????" ? setIs_Cate("") : setIs_Cate("??????");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "??????" ? "active" : "default"}
              bg={is_cate === "??????" ? "#6AD8F5" : "#f5fcff"}
            >
              <p>??????</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "??????" ? setIs_Cate("") : setIs_Cate("??????");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "??????" ? "active" : "default"}
              bg={is_cate === "??????" ? "#F58467" : "#f5fcff"}
            >
              <p>??????</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "??????" ? setIs_Cate("") : setIs_Cate("??????");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "??????" ? "active" : "default"}
              bg={is_cate === "??????" ? "#4299E9" : "#f5fcff"}
            >
              <p>??????</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "???????????????"
                ? setIs_Cate("")
                : setIs_Cate("???????????????");

              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "???????????????" ? "active" : "default"}
              bg={is_cate === "???????????????" ? "#5BC8D2" : "#f5fcff"}
            >
              <p>???????????????</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "??????" ? setIs_Cate("") : setIs_Cate("??????");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "??????" ? "active" : "default"}
              bg={is_cate === "??????" ? "#FE674C" : "#f5fcff"}
            >
              <p>??????</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "??????" ? setIs_Cate("") : setIs_Cate("??????");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "??????" ? "active" : "default"}
              bg={is_cate === "??????" ? "#FFD082" : "#f5fcff"}
            >
              <p>??????</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "??????" ? setIs_Cate("") : setIs_Cate("??????");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "??????" ? "active" : "default"}
              bg={is_cate === "??????" ? "#FFEF62" : "#f5fcff"}
            >
              <p>??????</p>
            </Grid>
          </CateBtn>
        </Category>

        {/* ????????????/???????????? */}
        <RecruitBox>
          <Text bold size="23px" margin="0 40px 0 20px">
            ????????????
          </Text>

          <FormControl sx={{ width: "30%" }}>
            <Select
              value={is_people}
              onChange={PeopleHandleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ height: "50px", fontSize: "20px" }}
            >
              <MenuItem value="" style={{ fontSize: "20px" }}>
                <em>????????? ??????????????????.</em>
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={1}>
                1???
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={2}>
                2???
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={3}>
                3???
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={4}>
                4???
              </MenuItem>
            </Select>
          </FormControl>
          <PlusBtn onClick={PeopleBtn}>???????????? +</PlusBtn>
        </RecruitBox>
        <Peoples>
          {majorList?.map((a, idx) => {
            return (
              <MajorLists key={idx}>
                {a.majorName} : {a.numOfPeopleSet} ???
                <BiX
                  size="18px"
                  style={{
                    cursor: "pointer",
                    display: "inline-flex",
                  }}
                  type="button"
                  onClick={() => {
                    DeleteMajor(idx);
                  }}
                />
              </MajorLists>
            );
          })}
        </Peoples>
        {/* ??????/URL?????? */}
        <Uploads />
        {/* content?????? */}
        <ContentBox>
          <TextBox
            placeholder="????????? ???????????????!"
            value={is_content}
            maxLength={250}
            onChange={ContentHandleChange}
          />
        </ContentBox>

        {/* ?????? ?????? */}
        <BtnBox>
          <AddBtn onClick={PostDetailBtn}>??????</AddBtn>
          <CloseBtn
            onClick={() => {
              history.goBack();
            }}
          >
            ??????
          </CloseBtn>
        </BtnBox>
      </Container>
      <Footer />
    </>
  );
};

const MajorLists = styled.span`
  border: 2px solid rgba(41, 103, 172, 1);
  padding: 8px 16px 5px 16px;
  font-size: 20px;
  float: left;
  margin-right: 2%;
  margin-bottom: 2%;
  border-radius: 20px;
  color: rgba(41, 103, 172, 1);
  background-color: #fff;
  height: 30px;
`;

const Peoples = styled.div`
  margin: 1% 10% 1%;
`;

const BtnBox = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  justify-content: flex-end;
  display: flex;
`;

const ContentBox = styled.div``;

const PlusBtn = styled.span`
  margin: 0 25px;
  color: rgba(41, 103, 172, 1);
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const RecruitBox = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TitleBox = styled.div`
  margin-top: 1%;
  align-items: center;
  flex-direction: row;
  display: flex;
`;

const Container = styled.div`
  width: 1370px;
  margin: 3% auto;
`;

const DropBox = styled.div`
  margin-top: 2%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TextBox = styled.textarea`
  margin-top: 1%;
  border: 1px solid #c4c4c4;
  width: 100%;
  height: 200px;
  padding: 5px 16px 5px 16px;
  font-size: 22px;
  resize: none;
  :focus {
    outline-color: gray;
  }

  ::placeholder {
    font-size: 22px;
    color: rgba(194, 192, 193, 1);
  }
`;

const Category = styled.div`
  justify-content: center;

  display: flex;
  margin-top: 10px;
  margin-bottom: 3%;
`;
const CateBtn = styled.div`
  height: 10px;
  border-radius: 10px;
  margin-right: 2%;
  .default {
    width: 140px;
    height: 50px;
    border-radius: 14px;
    border: 1px solid #e0f4fe;
    background-color: #f5fcff;
    box-shadow: inset 0px 4px 13px #d7f1fd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    p {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: #2967ac;
    }
  }
  .active {
    width: 140px;
    height: 50px;
    border-radius: 14px;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: inset 0px 4px 13px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    /* background-color: gray; */
    animation: 0.6s ease-in-out loadEffect3;

    p {
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      color: #fff;
    }
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

  .inactive {
    .icon {
      color: var(--help-color);
      font-size: 32px;
    }
    p {
      font-size: 12px;

      color: white;
    }
  }
`;

const InputBox = styled.input`
  padding: 5px 16px 5px 16px;
  border: 1px solid #c4c4c4;

  font-size: 20px;
  width: 75rem;
  height: 40px;
  :focus {
    outline-color: gray;
  }
`;

const HeaderText = styled.div`
  margin: 0 auto;
  padding-bottom: 15px;
  border-bottom: 1px solid #c4c4c4;
  span {
    font-size: 24px;
  }
`;

const AddBtn = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  font-size: 18px;
  margin-left: 10px;
  background: #4299e9;
  border: none;
  box-sizing: border-box;
  border-radius: 14px;
  color: #fff;
`;
const CloseBtn = styled.button`
  cursor: pointer;
  width: 120px;
  height: 40px;
  font-size: 18px;
  margin-left: 10px;
  background: #fe5953;
  border: none;
  box-sizing: border-box;
  color: #fff;
  border-radius: 14px;
`;

export default Write;
