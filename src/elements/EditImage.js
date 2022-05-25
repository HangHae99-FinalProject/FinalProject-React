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
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const EditImage = (props) => {
  const { image,marginTop, marginLeft, display, marginRight, padding, fontSize, ilWidth, ilHeight, imgDivMargin, ilBorder, imgDivWidth, imgBoxMargin, imgDivPadding, ilBgRepeat, ilIs_inline } = props;
  const eddit = {image}.image;
  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState([]);
  const [is_open, setIs_open] = useState(false);
  const [is_Url, setIs_url] = useState("");
  const Link = useSelector((state) => state.image.Url);

  const uploadFile = (e) => {
    const imageList = e.target.files;
    let imageUrlList = [...imgPreview];
    const maxImageCnt = 4;

    if (imageList.length > maxImageCnt) {
      window.alert("이미지는 최대 4개까지 가능합니다!");
    }

    // 파일들을 URL로 만듬
    for (let i = 0; i < imageList.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageList[i]);
      imageUrlList.push(currentImageUrl);
    }

    // 10개로 갯수 정함
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

  useEffect(() => {
    let editPree = [];
    // 서버에서 받은 URL을 PreView에 넣어줌
    for (let i = 0; i < eddit?.length; i++) {
      editPree.push(eddit[i]);
    }
    setImgPreview(editPree);
    // 리덕스에 files 인덱스를 맞추기 위해 URL도 같이 넣우줌
    dispatch(imgActions.setPre(editPree));
  }, [eddit]);

  const handleDeleteImage = (x, id) => {
    // 서버에서 준 URL 버킷 이름을 기준으로 찾아
    if (x.indexOf("mohum") !== -1) {
      dispatch(imgActions.editUrl(x));
      // URL을 따로 저장
      dispatch(imgActions.deletePre(id));
      // 리덕스 files에 있는 URL 삭제 (배열을 맞추기 위함)
    } else {
      // 리덕스에 files 삭제
      dispatch(imgActions.deletePre(id));
    }
    // 프리뷰 삭제
    setImgPreview(imgPreview.filter((b, idx) => idx !== id));
  };

  const handleUrl = (e) => {
    setIs_url(e.target.value);
  };

  const UrlButton = () => {
    dispatch(imgActions.setURL(is_Url));
  };

  const styles = { 
    marginTop: marginTop, 
    marginLeft: marginLeft, 
    display: display,
    marginRight: marginRight,
    padding: padding,
    fontSize: fontSize,
    ilWidth: ilWidth,
    ilHeight: ilHeight,
    imgDivMargin: imgDivMargin,
    ilBorder: ilBorder,
    imgDivWidth: imgDivWidth,
    imgBoxMargin: imgBoxMargin,
    imgDivPadding: imgDivPadding,
    ilBgRepeat: ilBgRepeat,
    ilIs_inline: ilIs_inline,
  };

  return (
    <>
      <UploadBox {...styles}>
        <Labels htmlFor="files" onChange={uploadFile}>
          <AddPhotoAlternateIcon {...styles} />
          <Inputs type="file" id="files" multiple="multiple" accept="image/*" />
        </Labels>

        <Labels {...styles}
          onClick={() => {
            setIs_open(!is_open);
          }}
        >
          <LinkIcon fontSize="large" />
        </Labels>
        {is_open ? (
          <>
            <UrlBox value={is_Url} placeholder="URL을 입력해주세요!" onChange={handleUrl} />
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
      <ImageDiv {...styles}>
        {imgPreview.map((image, id) => {
          return (
            <ImageBox {...styles} key={id}>
              <BiX
                size="20px"
                style={{ cursor: "pointer" }}
                type="button"
                onClick={() => {
                  handleDeleteImage(image, id);
                }}
              />

              <ImageList {...styles} src={`${image}`} alt={`${image}-${id}`} />
            </ImageBox>
          );
        })}
      </ImageDiv>
    </>
  );
};

EditImage.defaultProps = {
  fontSize:"large",
  marginTop: "2rem",
  marginLeft: "1rem",
  display: null,
  marginRight: "1px",
  padding: "5px 15px 5px 15px",
  ilWidth: "220px",
  ilHeight: "130px",
  ilBorder: "1px solid rgba(0, 0, 0, 0.07)",
  ilBgRepeat: null,
  imgDivMargin: "0 10%",
  imgDivWidth: null,
  imgDivPadding: null,
  imgBoxMargin: "0 20px",
  ilIs_inline: false
};

const UploadBox = styled.div`
  margin-top: ${(props) => props.marginTop};
  margin-left: ${(props) => props.marginLeft};
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

const ImageDiv = styled.div`
  margin: ${(props) => props.imgDivMargin};
  ${(props) => (props.imgDivWidth ? `width: ${props.imgDivWidth}` : "")};
  ${(props) => (props.imgDivPadding ? `padding: ${props.imgDivPadding}` : "")};
  ${(props) =>
    props.ilIs_inline
      ? `display:flex; flex-direction:row; justify-content: flex-start; align-items: center`
      : ""}
`;

const ImageBox = styled.div`
  margin: ${(props) => props.imgBoxMargin};
  /* margin-right: 50px; */
  /* margin-top: 1%; */
  display: inline-flex;

  flex-direction: column; /* row로 변경 시, 내용물이 가로로 나열됨 */
`;

const Labels = styled.label`
  ${(props) => (props.display ? `display: ${props.display}` : "")};
  margin-right: ${(props) => props.marginRight};
  align-items: center;
  cursor: pointer;
  padding: ${(props) => props.padding};
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
  width: ${(props) => props.ilWidth};
  height: ${(props) => props.ilHeight};
  border: ${(props) => props.ilBorder};
  border-radius: 3px;
  background-image: url("${(props) => props.src}");

  background-size: contain;
  background-position: center;
  ${(props) => (props.ilBgRepeat ? `background-repeat: ${props.ilBgRepeat}` : "")};
`;
export default EditImage;
