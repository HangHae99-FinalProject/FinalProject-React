import React, { useState } from "react";
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
    const CheckMojor = majorList.map((a) => a.majorName);

    if (is_cate === "" && is_people === "") {
      alert("모집분야와 인원을 선택해 주세요!");
      return;
    }
    if (is_cate === "") {
      alert("모집분야를 선택해 주세요!");
      return;
    }
    if (is_people === "") {
      alert("모집인원을 선택해 주세요!");
      return;
    }
    for (let i = 0; i < CheckMojor.length; i++) {
      if (is_cate === CheckMojor[i]) {
        alert("이미 같은 직군이 있습니다!");
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
      alert("제목을 입력해주세요!");
      return;
    }
    if (data.deadline === "") {
      alert("모집기간을 선택해주세요!");
      return;
    }
    if (data.region === "") {
      alert("지역을 선택해주세요!");
      return;
    }
    if (is_cate === "" && is_people === "") {
      alert("모집분야와 인원을 선택해 주세요!");
      return;
    }
    if (data.content === "") {
      alert("내용을 입력해주세요!");
      return;
    }
    dispatch(PostActions.__addPost(data));
  };

  return (
    <>
      <Container>
        {/* 헤더 제목 */}
        <HeaderText>
          <span style={{ fontWeight: "700" }}>등대에 모집글쓰기</span>
        </HeaderText>

        {/* 제목 입력 */}
        <TitleBox>
          <Text bold size="23px" margin="0 75px 0 20px">
            제목
          </Text>
          <InputBox
            placeholder="제목을 20글자 이내 적어주세요!"
            maxLength={25}
            value={is_title}
            onChange={TitleHandleChange}
          />
        </TitleBox>

        {/* 모집기간/ 지역 */}
        <DropBox>
          <Text bold size="23px" margin="0 40px 0 15px">
            모집기간
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
                <em>모집기간을 선택해주세요.</em>
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"1주"}>
                1주
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"2주"}>
                2주
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"3주"}>
                3주
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"4주"}>
                4주
              </MenuItem>
            </Select>
          </FormControl>

          <Text bold size="23px" margin="0 70px 0 50px">
            지역
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
                <em>지역을 선택해주세요.</em>
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"서울/경기"}>
                서울/경기
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"강원"}>
                강원
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"전북"}>
                전북
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"전라"}>
                전라
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"충북"}>
                충북
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"충남"}>
                충남
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"경남"}>
                경남
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"경북"}>
                경북
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"제주"}>
                제주
              </MenuItem>
            </Select>
          </FormControl>
        </DropBox>

        {/* 카테고리 버튼 */}
        <Text margin="2% 0 0 1%" size="17px" color="rgba(112, 112, 112, 1)">
          최소 하나의 분야를 선택해주세요!
        </Text>

        <Category>
          <CateBtn
            onClick={() => {
              is_cate === "미술/디자인"
                ? setIs_Cate("")
                : setIs_Cate("미술/디자인");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "미술/디자인" ? "active" : "default"}
              bg={is_cate === "미술/디자인" ? "#2967AC" : "#fff"}
            >
              <p>미술/디자인</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "영상" ? setIs_Cate("") : setIs_Cate("영상");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "영상" ? "active" : "default"}
              bg={is_cate === "영상" ? "#6AD8F5" : "#fff"}
            >
              <p>영상</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "배우" ? setIs_Cate("") : setIs_Cate("배우");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "배우" ? "active" : "default"}
              bg={is_cate === "배우" ? "#F58467" : "#fff"}
            >
              <p>배우</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "사진" ? setIs_Cate("") : setIs_Cate("사진");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "사진" ? "active" : "default"}
              bg={is_cate === "사진" ? "#4299E9" : "#fff"}
            >
              <p>사진</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "프로그래밍"
                ? setIs_Cate("")
                : setIs_Cate("프로그래밍");

              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "프로그래밍" ? "active" : "default"}
              bg={is_cate === "프로그래밍" ? "#5BC8D2" : "#fff"}
            >
              <p>프로그래밍</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "모델" ? setIs_Cate("") : setIs_Cate("모델");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "모델" ? "active" : "default"}
              bg={is_cate === "모델" ? "#FE674C" : "#fff"}
            >
              <p>모델</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "성우" ? setIs_Cate("") : setIs_Cate("성우");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "성우" ? "active" : "default"}
              bg={is_cate === "성우" ? "#FFD082" : "#fff"}
            >
              <p>성우</p>
            </Grid>
          </CateBtn>

          <CateBtn
            onClick={() => {
              is_cate === "음향" ? setIs_Cate("") : setIs_Cate("음향");
              setSelected(true);
            }}
          >
            <Grid
              _className={is_cate === "음향" ? "active" : "default"}
              bg={is_cate === "음향" ? "#FFEF62" : "#fff"}
            >
              <p>음향</p>
            </Grid>
          </CateBtn>
        </Category>

        {/* 전공선택/모집인원 */}
        <RecruitBox>
          <Text bold size="23px" margin="0 40px 0 20px">
            모집인원
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
                <em>인원을 선택해주세요.</em>
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"1"}>
                1명
              </MenuItem>
              <MenuItem style={{ fontSize: "20px" }} value={"2"}>
                2명
              </MenuItem>
            </Select>
          </FormControl>
          <PlusBtn onClick={PeopleBtn}>추가하기 +</PlusBtn>
        </RecruitBox>
        <Peoples>
          {majorList?.map((a, idx) => {
            return (
              <MajorLists key={idx}>
                {a.majorName} : {a.numOfPeopleSet} 명
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
        {/* 사진/URL입력 */}
        <Uploads />
        {/* content입력 */}
        <ContentBox>
          <TextBox
            placeholder="내용을 입력하세요!"
            value={is_content}
            maxLength={300}
            onChange={ContentHandleChange}
          />
        </ContentBox>

        {/* 버튼 박스 */}
        <BtnBox>
          <AddBtn onClick={PostDetailBtn}>등록</AddBtn>
          <CloseBtn
            onClick={() => {
              history.goBack();
            }}
          >
            취소
          </CloseBtn>
        </BtnBox>
      </Container>
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
  font-size: 18px;
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
    border: 1px solid black;
    background-color: #fff;
    /* box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25); */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .icon {
      font-size: 32px;
      color: var(--inactive-text-color);
    }
    p {
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: black;
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
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
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
