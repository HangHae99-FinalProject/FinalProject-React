import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { actionCreates as postActions } from "../../redux/modules/post";
import { history } from "../../redux/configureStore";

const MainSearch = ({ location, category, selected }) => {
  const dispatch = useDispatch();
  const [is_search, setIs_Search] = useState("");
  const [is_searchValue, setIs_SearchValue] = useState("");
  const [pages, setpages] = useState(0);
  const [area, setarea] = useState(location);
  const [is_titleSearch, setIs_TitleSearch] = useState([]);
  const [is_nameSearch, setIS_NameSearch] = useState([]);
  const searchList = useSelector((state) => state.post.searchList);

  const titleList = searchList.map((a) => a.titleList);
  const nicknameList = searchList.map((a) => a.nicknameList);
  const contentList = searchList.map((a) => a.contentList);

  const setNameList = [];
  const setTitleList = [];
  const nameSet = nicknameList?.map((a) => [...new Set(a)]);
  nameSet?.map((a) => a?.map((i) => setNameList.push(i)));

  const titleSet = titleList?.map((a) => [...new Set(a)]);

  titleSet?.map((a) => a?.map((i) => setTitleList.push(i)));

  let is_select = selected;

  const searchHandleChange = (event) => {
    setIs_Search(event.target.value);
  };

  const searchValueHandle = (e) => {
    setIs_SearchValue(e.target.value);
    if (is_search === "") {
      alert("검색어를 먼저 설정해 주세요!");
      return;
    }

    let data = e.target.value;
    // console.log(is_search);
    if (is_search === "title") {
      let filterData = setTitleList.filter((a) =>
        a.toLowerCase().includes(data.toLowerCase())
      );
      if (data.length === 0) {
        filterData = [];
      }
      setIS_NameSearch(filterData);
    }
    if (is_search === "nickname") {
      let filterData = setNameList.filter((a) =>
        a.toLowerCase().includes(data.toLowerCase())
      );
      if (data.length === 0) {
        filterData = [];
      }
      setIS_NameSearch(filterData);
    }
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
    console.log(is_searchValue);
    if (is_search === "") {
      alert("검색어를 설정해 주세요!");
      return;
    }
    setIs_SearchValue("");
    setIS_NameSearch([]);
    setIs_TitleSearch([]);

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

  useEffect(() => {
    setIs_Search(is_search);
    setIs_SearchValue("");
  }, [is_search]);

  useEffect(() => {
    dispatch(postActions.__getSearchData());
  }, []);

  return (
    <SearchBox>
      <FormControl sx={{ width: "240px", marginRight: "1rem", height: "63px" }}>
        <Select
          value={is_search}
          onChange={searchHandleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="selectBox"
          style={{ width: "240px", marginRight: "1rem", height: "63px" }}
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
        <SearchInputBox>
          <SearchInput
            onChange={searchValueHandle}
            placeholder="검색어를 먼저 설정해주세요!"
            onKeyDown={handleEvent}
            value={is_searchValue}
          />

          <SearchPreview>
            <AutoSearchWrap>
              {is_nameSearch
                ? is_nameSearch.map((a, idx) => {
                    return (
                      <AutoSearchData key={idx}>
                        <p
                          onClick={() => {
                            dispatch(
                              postActions.__getPost(
                                pages,
                                area,
                                category,
                                is_search,
                                a,
                                is_select
                              )
                            );
                            setIS_NameSearch("");
                          }}
                        >
                          {a}
                        </p>
                      </AutoSearchData>
                    );
                  })
                : null}
              {is_titleSearch
                ? is_titleSearch.map((a, idx) => {
                    return (
                      <AutoSearchData key={idx}>
                        <p
                          onClick={() => {
                            dispatch(
                              postActions.__getPost(
                                pages,
                                area,
                                category,
                                is_search,
                                a,
                                is_select
                              )
                            );
                            setIS_NameSearch("");
                          }}
                        >
                          {a}
                        </p>
                      </AutoSearchData>
                    );
                  })
                : null}
            </AutoSearchWrap>
          </SearchPreview>
        </SearchInputBox>
        <div className="buttonBox">
          <div className="line" />
          <span onClick={searchButton}> 검색</span>
        </div>
      </InputBox>
    </SearchBox>
  );
};

const AutoSearchWrap = styled.ul``;

const AutoSearchData = styled.li`
  width: 100%;
  padding: 10px 8px;
  font-size: 16px;
  font-weight: bold;
  z-index: 12px;
  letter-spacing: 2px;

  :hover {
    background-color: aqua;
    cursor: pointer;
  }
`;

const SearchInputBox = styled.div``;

const SearchPreview = styled.div`
  position: absolute;
  z-index: 10px;
  width: 570px;
  background-color: #fff;
  height: auto;
  outline: none;
  border: 5px gray;
`;

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
    z-index: 9999px;
  }
  span {
    z-index: 999px;
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
