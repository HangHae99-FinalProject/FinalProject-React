import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "../../elements/Grid";
import styled from "styled-components";
import MainCard from "./MainCard";
import flex from "../../themes/flex";
import MuiGrid from "@mui/material/Grid";

const MainList = ({ location, category, selected }) => {
  // redux 가져오기
  const dispatch = useDispatch();

  // console.log("리덕스 저장되서 받아온 값(useSelector) ", post_data);
  // 지역, 카테고리 값 state로 관리
  const [area, setarea] = useState(location);
  const [cate, setcate] = useState(category);

  // 무한 스크롤 동작을 감지 하기 위한 상태값 관리
  const [hasMore, sethasMore] = useState(true);
  const [items, setItems] = useState([]);

  // 스피너 및 게시물 없는거 감시 할 state
  const [is_loading, setIs_Loading] = useState(false);

  // api로 넘겨줘야 할 값들
  // 동네 설정을 했을 때, 전체보기를 하기 위해 null 혹은 빈 값을 보내야하기때문에
  // 따로 조건문을 써서 값을 정해주었습니다.

  return (
    <React.Fragment>
      <MainContainer>
        {/* {post_data.posts.length === 0 && category === '' &&  
        <div className="spinner"><Spinner /></div>
        }

        <InfiniteScroll
          dataLength={post_data.posts.length} //This is important field to render the next data
          next={getData}
          hasMore={hasMore}
        >
          {post_data.posts.length === 0 && is_loading === false && category !== '' ? (

            <div className="no-post">
              <NoPost />
            </div>
          ) : ( */}
        <>
          <MuiGrid
            container
            spacing={4}
            columnSpacing={7}
            rowSpacing={5}
            style={{ padding: "16px 64px " }}
          >
            <MuiGrid item xs={4}>
              <MainCard />
            </MuiGrid>
            <MuiGrid item xs={4}>
              <MainCard />
            </MuiGrid>
            <MuiGrid item xs={4}>
              <MainCard />
            </MuiGrid>
            <MuiGrid item xs={4}>
              <MainCard />
            </MuiGrid>
            <MuiGrid item xs={4}>
              <MainCard />
            </MuiGrid>
            <MuiGrid item xs={4}>
              <MainCard />
            </MuiGrid>
            <MuiGrid item xs={4}>
              <MainCard />
            </MuiGrid>

            {/* {post_data.posts.map((item, idx) => {
                  return <PostCard key={item.id} item={item} />;
                })} */}
          </MuiGrid>
        </>
        {/* )}      */}

        {/* </InfiniteScroll> */}
      </MainContainer>
    </React.Fragment>
  );
};

const MainContainer = styled.div`
  .spinner {
    position: relative;
    top: 25%;
    left: 50%;
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
