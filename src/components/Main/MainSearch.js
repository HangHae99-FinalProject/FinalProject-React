import React, { useEffect, useRef, useState } from "react";
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
  const [is_SearchList, setIS_SearchList] = useState([]);

  const searchList = useSelector((state) => state.post.searchList);

  const titleList = searchList.map((a) => a.titleList);
  const nicknameList = searchList.map((a) => a.nicknameList);

  const setNameList = [];
  const setTitleList = [];
  const nameSet = nicknameList?.map((a) => [...new Set(a)]);
  nameSet?.map((a) => a?.map((i) => setNameList.push(i)));

  const titleSet = titleList?.map((a) => [...new Set(a)]);

  titleSet?.map((a) => a?.map((i) => setTitleList.push(i)));

  let is_select = selected;

  const searchHandleChange = (event) => {
    setIs_Search(event.target.value);
    console.log(event.target.value);
  };

  const searchValueHandle = (e) => {
    setIs_SearchValue(e.target.value);
    if (is_search === "") {
      alert("검색어를 먼저 설정해 주세요!");
      return;
    }

    let data = e.target.value;

    if (is_search === "title") {
      let filterData = setTitleList.filter((a) =>
        a.toLowerCase().includes(data.toLowerCase())
      );
      if (data.length === 0) {
        filterData = [];
      }
      setIS_SearchList(filterData);
    }
    if (is_search === "nickname") {
      let filterData = setNameList.filter((a) =>
        a.toLowerCase().includes(data.toLowerCase())
      );
      if (data.length === 0) {
        filterData = [];
      }
      setIS_SearchList(filterData);
    }
  };

  const handleEvent = (e) => {
    // if (is_nameSearch.length > 0 || is_titleSearch.length > 0) {
    //   if (e.key === "ArrowDown") {
    //     setIndex(index + 1);
    //     if (autoRef.current?.childElementCount === index + 1) setIndex(0);

    //     return;
    //   } else if (e.key === "ArrowUp") {
    //     setIndex(index - 1);

    //     if (index <= 0) {
    //       setIS_NameSearch([]);
    //       setIs_TitleSearch([]);
    //       setIndex(-1);
    //     }
    //     return;
    //   } else if (e.key === "Escaop") {
    //     setIS_NameSearch([]);
    //     setIs_TitleSearch([]);
    //     setIndex(-1);
    //     return;
    //   }
    // }

    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key !== "Enter") {
      return;
    }
    searchButton();
    // if (e.key === "Enter") {
    //   is_titleSearch.map((a, idx) => {
    //     if (a.idx === index) {
    //       dispatch(
    //         postActions.__getPost(
    //           pages,
    //           area,
    //           category,
    //           is_search,
    //           a,
    //           is_select
    //         )
    //       );
    //     }
    //   });
    // }
  };

  const searchButton = () => {
    console.log(is_searchValue);
    if (is_search === "") {
      alert("검색어를 설정해 주세요!");
      return;
    }
    setIs_SearchValue("");

    setIS_SearchList([]);

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
    if (location === "위치설정" || location === "전체") {
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
          style={{
            width: "240px",
            marginRight: "1rem",
            height: "63px",
            boxShadow: "inset 0px 4px 9px rgba(0, 0, 0, 0.13)",
            color: "#B3B3B3",
          }}
        >
          <MenuItem
            value=""
            style={{
              fontSize: "20px",
              backgroundColor: "#fff",
              color: "#ACACAC",
            }}
          >
            <span style={{ color: "#ACACAC" }}>검색어 설정</span>
          </MenuItem>
          <MenuItem
            style={{ fontSize: "20px", color: "#B3B3B3" }}
            value={"title"}
          >
            제목
          </MenuItem>
          <MenuItem
            style={{ fontSize: "20px", color: "#B3B3B3" }}
            value={"nickname"}
          >
            유저이름
          </MenuItem>
          <MenuItem
            style={{ fontSize: "20px", color: "#B3B3B3" }}
            value={"content"}
          >
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
          {is_SearchList.length > 0 && is_searchValue && (
            <SearchPreview>
              <AutoSearchWrap>
                {is_SearchList
                  ? is_SearchList.map((a, idx) => {
                      return (
                        <AutoSearchData
                          key={idx}
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
                            setIS_SearchList("");
                          }}
                        >
                          <p>{a}</p>
                        </AutoSearchData>
                      );
                    })
                  : null}
              </AutoSearchWrap>
            </SearchPreview>
          )}
        </SearchInputBox>
        <div className="buttonBox">
          <div className="line" />
          <span onClick={searchButton}> 검색</span>
        </div>
      </InputBox>
    </SearchBox>
  );
};

const AutoSearchWrap = styled.div``;

const AutoSearchData = styled.div`
  width: 93%;
  color: #acacac;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  z-index: 12px;
  height: auto;
  max-height: 300px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
  :hover {
    background-color: #f5fcff;
    cursor: pointer;
  }
`;

const SearchInputBox = styled.div``;

const SearchPreview = styled.div`
  position: absolute;
  z-index: 3px;
  width: 560px;
  height: auto;
  max-height: 500px;
  background-color: #feffff;

  border: 2px solid #d8d8d8;
  top: 550px;
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
    background-color: #818181;

    z-index: 9999px;
  }
  span {
    z-index: 999px;
    width: 76px;
    font-size: 24px;
    color: #818181;
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
    border-radius: 14px;
  }
`;

const SearchInput = styled.input`
  width: 550px;
  margin-right: 1rem;
  height: 59px;
  background: #feffff;
  border: 1px solid #d8d8d8;
  border-radius: 14px;
  font-size: 20px;
  padding-left: 10px;
  box-shadow: inset 0px 4px 9px rgba(0, 0, 0, 0.13);
  :focus {
    outline-color: gray;
  }
  ::placeholder {
    color: #acacac;
  }
`;

export default MainSearch;
