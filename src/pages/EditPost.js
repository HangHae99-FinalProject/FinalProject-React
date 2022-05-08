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
import { useParams } from "react-router-dom";
import EditImage from "../elements/EditImage";
import { imgActions } from "../redux/modules/image";

const EditPost = () => {
  const post_list = useSelector((state) => state.post.detailList);
  const link = useSelector((state) => state.image.Url);
  const dispatch = useDispatch();
  const param = useParams();

  const [is_location, setLocation] = useState(
    post_list ? post_list.region : ""
  );
  const [is_Week, setWeek] = useState(post_list ? post_list.deadline : "");
  const [is_title, setIs_Title] = useState(post_list.title);
  const [is_content, setIs_Content] = useState(post_list.content);

  const Files = useSelector((state) => state.image.files);
  // 파일만 넣을 빈 배열
  let newFiles = [];
  // URL을 분리할 배열

  for (let i = 0; i < Files.length; i++) {
    // 조건을 걸어 파일안에 name이 있으면 파일을 넣음
    if (Files[i].name) {
      newFiles.push(Files[i]);
    }
  }

  const imgUrl = useSelector((state) => state.image.editUrl);

  const data = {
    imgUrl,
    content: is_content,
    title: is_title,
    deadline: is_Week,
    region: is_location,
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

  const post_id = param.postid;
  const is_edit = post_id ? true : false;

  useEffect(() => {
    if (is_edit) {
      dispatch(PostActions.__getDetail(post_id));
      dispatch(imgActions.initPre());
    }
  }, []);

  const editDetailBtn = () => {
    if (data.title === "") {
      alert("제목을 입력해주세요!");
      return;
    }
    if (data.content === "") {
      alert("내용을 입력해주세요!");
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
    dispatch(PostActions.__editPost(data, post_id, newFiles));
  };

  return (
    <>
      <Container>
        {/* 헤더 제목 */}
        <HeaderText>
          <span style={{ fontWeight: "700" }}>등에 모집글 수정하기</span>
        </HeaderText>

        {/* 제목 입력 */}
        <TitleBox>
          <Text bold size="23px" margin="0 75px 0 20px">
            제목
          </Text>
          <InputBox
            placeholder="제목을 20글자 이내 적어주세요!"
            maxLength={20}
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
              defaultValue={post_list.deadline}
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
              <MenuItem style={{ fontSize: "20px" }} value={"온라인"}>
                온라인
              </MenuItem>
            </Select>
          </FormControl>
        </DropBox>

        {/* 사진/URL입력 */}
        <EditImage image={post_list.imgList} />
        {/* content입력 */}
        <ContentBox>
          <TextBox
            placeholder="내용을 입력하세요!"
            value={is_content}
            onChange={ContentHandleChange}
          />
        </ContentBox>

        {/* 버튼 박스 */}
        <BtnBox>
          <AddBtn onClick={editDetailBtn}>수정</AddBtn>

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

const BtnBox = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  justify-content: flex-end;
  display: flex;
`;

const ContentBox = styled.div``;

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

export default EditPost;
