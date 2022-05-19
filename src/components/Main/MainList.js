import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import MainCard from "./MainCard";
import flex from "../../themes/flex";
import InfiniteScroll from "react-infinite-scroll-component";
import { actionCreates as postActions } from "../../redux/modules/post";
import Spinner from "../Spinner";

const MainList = ({ location, category, selected }) => {
  // redux 가져오기
  const dispatch = useDispatch();
  const page = useSelector((state) => state.post.page);
  const postList = useSelector((state) => state.post.list);
  const searchList = useSelector((state) => state.post.search);
  const [is_scroll, setIs_scroll] = useState(window.scrollY);

  // console.log("리덕스 저장되서 받아온 값(useSelector) ", post_data);
  // 지역, 카테고리 값 state로 관리
  const [pages, setpages] = useState(page);
  const [area, setarea] = useState(location);
  const [is_search, setIs_Search] = useState("");
  const [is_searchValue, setIs_SearchValue] = useState("");
  let is_select = selected;

  // 무한 스크롤 동작을 감지 하기 위한 상태값 관리
  const [hasMore, sethasMore] = useState(true);

  // 스피너 및 게시물 없는거 감시 할 state
  const [is_loading, setIs_Loading] = useState(false);

  // api로 넘겨줘야 할 값들
  // 동네 설정을 했을 때, 전체보기를 하기 위해 null 혹은 빈 값을 보내야하기때문에
  // 따로 조건문을 써서 값을 정해주었습니다.
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
    let data;
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
          <MainCardBox>
            {postList?.map((item, idx) => {
              return <MainCard item={item} key={idx} />;
            })}
          </MainCardBox>
        </InfiniteScroll>
      </MainContainer>
    </React.Fragment>
  );
};

const MainCardBox = styled.div`
  width: auto;
  height: 800px;

  @media screen and (max-height: 1000px) {
    height: 500px;
  }
  @media screen and (max-height: 650px) {
    height: 200px;
  }
`;

const MainContainer = styled.div`
  .spinner {
    /* top: 90%; */
    /* left: 90%; */
    /* bottom: 50%; */
    transform: translate(0);
  }
  .post-list {
    ${flex}
  }

  .empty {
    height: 100vh;
  }

  .no-post {
    margin-top: -100px;
  }

  .display-none {
    display: none;
  }
`;

export default MainList;
