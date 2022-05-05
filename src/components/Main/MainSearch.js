import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";

const MainSearch = () => {
  const [is_search, setIs_Search] = useState("");

  const searchHandleChange = (event) => {
    setIs_Search(event.target.value);
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
            <em>인원을 선택해주세요.</em>
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={"1"}>
            1명
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={"2"}>
            2명
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={"3"}>
            2명
          </MenuItem>
          <MenuItem style={{ fontSize: "20px" }} value={"4"}>
            2명
          </MenuItem>
        </Select>
      </FormControl>
      <div>
        <SearchInput />
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
