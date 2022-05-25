import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import MainCard from "./MainCard";
import flex from "../../themes/flex";
import InfiniteScroll from "react-infinite-scroll-component";
import { actionCreates as postActions } from "../../redux/modules/post";
import Spinner from "../Spinner";
import NoPost from "./NoPost";

const MainList = ({ location, category, selected }) => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.post.page);
  const postList = useSelector((state) => state.post.list);
  const searchList = useSelector((state) => state.post.search);

  const [pages, setpages] = useState(page);
  const [area, setarea] = useState(location);
  const [is_search, setIs_Search] = useState("");
  const [is_searchValue, setIs_SearchValue] = useState("");
  let is_select = selected;

  const [hasMore, sethasMore] = useState(true);

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
    if (pages === 0) {
      is_select = false;
    }

    dispatch(
      postActions.__getPost(
        pages,
        area,
        category,
        searchList.is_search,
        searchList.is_searchValue,
        is_select
      )
    );
  }, [area, category, page]);

  const getData = () => {
    let count = pages + 1;
    if (postList.length < 8) {
      return;
    }
    dispatch(
      postActions.__getPost(count, area, category, is_search, is_searchValue)
    );
    setpages(count);
  };

  return (
    <React.Fragment>
      <MainContainer>
        {postList?.length === 0 && category === "" && (
          <div className="spinner">
            <Spinner />
          </div>
        )}
        <InfiniteScroll
          dataLength={postList.length}
          next={getData}
          hasMore={hasMore}
        >
          {postList?.length === 0 && category !== "" ? (
            <NoPost />
          ) : (
            <MainCardBox>
              {postList?.map((item, idx) => {
                return <MainCard item={item} key={idx} />;
              })}
            </MainCardBox>
          )}
        </InfiniteScroll>
      </MainContainer>
    </React.Fragment>
  );
};

const MainCardBox = styled.div`
  width: 1370px;
  height: 800px;

  @media screen and (max-height: 1000px) {
    height: 500px;
  }
  @media screen and (max-height: 650px) {
    height: 200px;
  }
`;

const MainContainer = styled.div`
  margin-top: 10px;
  .spinner {
    top: 90%;
    left: 90%;
    bottom: 50%;
    transform: translate(0);
  }
`;

export default MainList;
