import React, { useEffect, useState } from "react";
import Grid from "./Grid";
import { BiX } from "react-icons/bi";
import styled from "styled-components";
import { HiUpload } from "react-icons/hi";
import { useDispatch } from "react-redux";

const Uploads = () => {
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState([]);

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

    let imgList = [];

    for (const key in imageList) {
      if (Object.hasOwnProperty.call(imageList, key)) {
        imgList.push(imageList[key]);
      }
    }
  };

  const handleDeleteImage = (id) => {
    setImgPreview(imgPreview.filter((b, idx) => idx !== id));
  };

  return (
    <>
      <Grid is_flex width="auto">
        <Labels htmlFor="files" onChange={uploadFile}>
          <HiUpload style={{ marginTop: "5px" }} />
          <Inputs type="file" id="files" multiple="multiple" accept="image/*" />
        </Labels>
      </Grid>
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
    </>
  );
};

export default Uploads;

const ImageBox = styled.div`
  margin-top: 1%;
  width: 14%;
  float: left;
  margin-right: 38px;
`;

const Labels = styled.label`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 5px 16px 5px 16px;
  line-height: 100px;
  font-size: 18px;
  width: 90.2%;
  height: 30px;
  border: 1px solid #c4c4c4;
  border-radius: 1px;
  background-color: #c6c6c6; ;
`;

const Inputs = styled.input`
  display: none;
`;

const ImageList = styled.div`
  width: 200px;
  height: 130px;
  margin-left: 2%;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: 3px;
  background-image: url("${(props) => props.src}");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;
