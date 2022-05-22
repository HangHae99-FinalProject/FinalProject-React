import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreates as postActions } from "../../redux/modules/post";

const MainSearch = ({ location, category, selected }) => {
  const dispatch = useDispatch();
  const [is_search, setIs_Search] = useState("");
  const [is_searchValue, setIs_SearchValue] = useState("");
  const [pages, setpages] = useState(0);
  const [area, setarea] = useState(location);

  let is_select = selected;
  const searchHandleChange = (event) => {
    setIs_Search(event.target.value);
  };

  const searchValueHandle = (e) => {
    setIs_SearchValue(e.target.value);
  };

  const handleEvent = (e) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key !== "Enter") {
      return;
    }
    searchButton();
  };

  const searchButton = () => {
    dispatch(
      postActions.__getPost(
        pages,
        area,
        category,
        is_search,
        is_searchValue,
        is_select
      )
    );
    console.log(area);
  };

  const curLocation = () => {
    if (location === "위치 설정" || location === "전체") {
      return setarea("");
    } else {
      return setarea(location);
    }
  };

  useEffect(() => {
    curLocation();
    setpages(0);
  }, [location, category]);

  return (
    <SearchBox>
      <FormControl sx={{ width: "50%", marginRight: "1rem" }}>
        <Select
          value={is_search}
          onChange={searchHandleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="selectBox"
        >
          <MenuItem value="" style={{ fontSize: "20px" }}>
            <em>검색어 설정</em>
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={"title"}>
            제목
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={"nickname"}>
            유저이름
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={"content"}>
            내용
          </MenuItem>
        </Select>
      </FormControl>
      <InputBox>
        <SearchInput
          onChange={searchValueHandle}
          placeholder="검색어를 먼저 설정해주세요!"
          onKeyDown={handleEvent}
        />

        <div className="buttonBox">
          <div className="line" />
          <span onClick={searchButton}> 검색</span>
        </div>
      </InputBox>
    </SearchBox>
  );
};

const InputBox = styled.div`
  display: flex;
  .buttonBox {
    display: flex;
    text-align: center;
    align-items: center;
    margin-left: -6rem;
  }
  .line {
    width: 3px;
    height: 27px;
    background-color: #b9daf6;
    border-radius: 14px;
  }
  span {
    width: 76px;
    font-size: 24px;
    color: #2967ac;
    flex-direction: column;
    cursor: pointer;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  .selectBox {
    height: 63px;
    font-size: 20px;
    width: 15rem;
    border: 1px solid #b9daf6;
    box-shadow: inset 0px 4px 9px rgba(0, 0, 0, 0.13);
    border-radius: 14px;
    :focus {
      outline: none;
    }
    :hover {
      color: none;
    }
  }
`;

const SearchInput = styled.input`
  width: 570px;
  margin-right: 1rem;
  height: 63px;
  border: 1px solid #b9daf6;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 9px rgba(0, 0, 0, 0.13);
  border-radius: 14px;
  font-size: 20px;
  padding: 8px 16px 5px 16px;
  :focus {
    outline: none;
  }
`;

export default MainSearch;
