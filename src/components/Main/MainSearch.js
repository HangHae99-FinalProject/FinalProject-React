import React, { useState } from "react";
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
  const [area, setarea] = useState(location);
  const [pages, setpages] = useState(0);
  // console.log(area);
  // console.log(category);
  // console.log(location);
  let is_select = selected;
  const searchHandleChange = (event) => {
    setIs_Search(event.target.value);
  };

  const searchValueHandle = (e) => {
    setIs_SearchValue(e.target.value);
  };

  const searchButton = () => {
    dispatch(
      postActions.__getPost(
        category,
        area,
        pages,
        is_search,
        is_searchValue,
        is_select
      )
    );
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <FormControl sx={{ width: "50%", marginRight: "1rem" }}>
        <Select
          value={is_search}
          onChange={searchHandleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          style={{
            height: "63px",
            fontSize: "20px",
            width: "15rem",
            border: "1px solid #B9DAF6",
            boxShadow: "inset 0px 4px 9px rgba(0, 0, 0, 0.13)",
            borderRadius: "14px",
          }}
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
      <div>
        <SearchInput onChange={searchValueHandle} />
        <button onClick={searchButton}>테스트</button>
      </div>
    </div>
  );
};

const SearchInput = styled.input`
  width: 570px;
  margin-right: 1rem;
  height: 63px;
  border: 1px solid #b9daf6;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 9px rgba(0, 0, 0, 0.13);
  border-radius: 14px;
`;

export default MainSearch;
