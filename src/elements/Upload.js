import React, { useCallback, useEffect, useState } from "react";
import Grid from "./Grid";
import { BiX } from "react-icons/bi";
import styled from "styled-components";
import { HiUpload } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import LinkIcon from "@mui/icons-material/Link";
import { imgActions } from "../redux/modules/image";
import DownloadDoneRoundedIcon from "@mui/icons-material/DownloadDoneRounded";

const Uploads = () => {
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState([]);
  const [is_open, setIs_open] = useState(false);
  const [is_Url, setIs_url] = useState("");
  const Link = useSelector((state) => state.image.Url);

  const uploadFile = (e) => {
    const imageList = e.target.files;
    let imageUrlList = [...imgPreview];

    for (let i = 0; i < imageList.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageList[i]);
      imageUrlList.push(currentImageUrl);
    }

    if (imageUrlList.length > 4) {
      alert("사진은 최대 4장만 가능합니다!");
    } else {
      setImgPreview(imageUrlList);
    }

    if (imageUrlList.length > 4) {
      window.alert("이미지는 최대 4개까지 가능합니다!");
    } else {
      let imgList = [];
      // 파일들을 꺼내 배열안에 넣어줌
      for (const key in imageList) {
        if (Object.hasOwnProperty.call(imageList, key)) {
          imgList.push(imageList[key]);
        }
      }
      setImgPreview(imageUrlList);
      dispatch(imgActions.setPre(imgList));
    }
  };

  const handleUrl = (e) => {
    setIs_url(e.target.value);
  };

  const UrlButton = () => {
    dispatch(imgActions.setURL(is_Url));
  };

  const handleDeleteImage = (id) => {
    dispatch(imgActions.deletePre(id));
    setImgPreview(imgPreview.filter((b, idx) => idx !== id));
  };

  return (
    <>
      <UploadBox>
        <Labels htmlFor="files" onChange={uploadFile}>
          <InsertPhotoIcon fontSize="large" />
          <Inputs type="file" id="files" multiple="multiple" accept="image/*" />
        </Labels>

        <Labels
          onClick={() => {
            setIs_open(!is_open);
          }}
        >
          <LinkIcon fontSize="large" />
        </Labels>
        {is_open ? (
          <>
            <UrlBox
              value={is_Url}
              placeholder="URL을 입력해주세요!"
              onChange={handleUrl}
            />
            <UrlBtn title="submit" onClick={UrlButton}>
              확인
            </UrlBtn>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Link ? (
                <DownloadDoneRoundedIcon
                  sx={{
                    marginLeft: "20px",
                    color: "#707070",
                  }}
                  fontSize="large"
                />
              ) : null}
            </div>
          </>
        ) : null}
      </UploadBox>
      <div style={{ margin: "0 10%" }}>
        {imgPreview.map((image, id) => {
          return (
            <ImageBox key={id}>
              <BiX
                size="20px"
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => {
                  handleDeleteImage(id);
                }}
              />

              <ImageList src={`${image}`} alt={`${image}-${id}`} />
            </ImageBox>
          );
        })}
      </div>
    </>
  );
};

export default Uploads;

const UploadBox = styled.div`
  margin-top: 2rem;
  margin-left: 1rem;
  display: flex;
  background-color: white;
  width: 80%;
  height: 50px;
`;

const UrlBtn = styled.button`
  cursor: pointer;
  margin-left: -45px;
  background-color: transparent;
  border: 1px solid transparent;
  color: gray;
  font-size: 16px;
`;

const UrlBox = styled.input`
  font-size: 17px;
  padding: 5px 15px 5px 15px;
  margin-left: 2px;
  width: 45%;
  border: 1px solid gray;
  border-radius: 10px;

  :focus {
    outline: none;
  }
`;
const ImageBox = styled.div`
  margin: 0 20px;
  /* margin-right: 50px; */
  /* margin-top: 1%; */
  display: inline-flex;

  flex-direction: column; /* row로 변경 시, 내용물이 가로로 나열됨 */
`;

const Labels = styled.label`
  margin-right: 1px;
  align-items: center;
  cursor: pointer;
  padding: 5px 15px 5px 15px;
  /* line-height: 100px; */
  width: 25px;
  height: 30px;

  border-radius: 1px;
  background-color: transparent;
`;

const Inputs = styled.input`
  display: none;
`;

const ImageList = styled.div`
  width: 220px;
  height: 130px;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 3px;
  background-image: url("${(props) => props.src}");

  background-size: contain;
  background-position: center;
`;
