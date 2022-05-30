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
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Swal from "sweetalert2";
import imageCompression from "browser-image-compression";

const EditImage = (props) => {
  const {
    image,
    margintop,
    marginleft,
    display,
    marginright,
    padding,
    fontSize,
    il_width,
    il_height,
    img_div_margin,
    il_border,
    img_div_width,
    img_box_margin,
    img_div_padding,
    il_bg_repeat,
    _onChange,
  } = props;
  const eddit = { image }.image;

  const dispatch = useDispatch();
  const [imgPreview, setImgPreview] = useState([]);

  const [is_open, setIs_open] = useState(false);
  const [is_Url, setIs_url] = useState("");
  const Link = useSelector((state) => state.image.Url);

  const uploadFile = async (e) => {
    const imageList = e.target.files;
    let imageUrlList = [...imgPreview];
    let compressedFileList = [];

    const options = {
      maxSizeMB: 2,
      maxWidth: 990,
    };

    try {
      for (let i = 0; i < imageList.length; i++) {
        const compressedFile = await imageCompression(imageList[i], options);
        compressedFileList.push(compressedFile);

        const currentImageUrl = URL.createObjectURL(compressedFile);
        imageUrlList.push(currentImageUrl);
      }
      if (imageUrlList.length > 4) {
        Swal.fire({
          title: "이미지는 최대 4개까지 가능합니다!",
          icon: "error",
        });
        return;
      } else {
        setImgPreview(imageUrlList);
      }
      dispatch(imgActions.setPre(compressedFileList));
    } catch (err) {
      console.log(err);
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
    setIs_url(Link);
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
    margintop: margintop,
    marginleft: marginleft,
    display: display,
    marginright: marginright,
    padding: padding,
    fontSize: fontSize,
    il_width: il_width,
    il_height: il_height,
    img_div_margin: img_div_margin,
    il_border: il_border,
    img_div_width: img_div_width,
    img_box_margin: img_box_margin,
    img_div_padding: img_div_padding,
    il_bg_repeat: il_bg_repeat,
  };

  return (
    <>
      <UploadBox {...styles}>
        <Labels htmlFor="files" onChange={uploadFile}>
          <AddPhotoAlternateIcon {...styles} />
          <Inputs
            type="file"
            id="files"
            multiple="multiple"
            accept=".jpg,.png"
          />
        </Labels>

        <Labels
          {...styles}
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
      <ImageComment>
        <span>
          (권장 사이즈 <span className="imageSize">990*500)</span>
          &nbsp;JPG,PNG로 올려주세요!&nbsp;&nbsp;&nbsp; ⌽ 이미지는 최대 4장까지
          가능합니다!
        </span>
      </ImageComment>
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

              <ImageList
                {...styles}
                src={`${image}`}
                alt={`${image}-${id}`}
                onChange={_onChange}
              />
            </ImageBox>
          );
        })}
      </ImageDiv>
    </>
  );
};

EditImage.defaultProps = {
  fontSize: "large",
  margintop: "2rem",
  marginleft: "1rem",
  display: null,
  marginright: "1px",
  padding: "5px 15px 5px 15px",
  il_width: "220px",
  il_height: "130px",
  il_border: "1px solid rgba(0, 0, 0, 0.07)",
  il_bg_repeat: null,
  img_div_margin: "0 10%",
  img_div_width: null,
  img_div_padding: null,
  img_box_margin: "0 20px",
  _onChange: () => {},
};

const ImageComment = styled.div`
  font-size: 20px;
  margin-left: 36px;
  font-weight: 500;
  .imageSize {
    font-weight: bold;
  }
`;

const UploadBox = styled.div`
  margin-top: ${(props) => props.margintop};
  margin-left: ${(props) => props.marginleft};
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
  margin: ${(props) => props.img_div_margin};
  ${(props) => (props.img_div_width ? `width: ${props.img_div_width}` : "")};
  ${(props) =>
    props.img_div_padding ? `padding: ${props.img_div_padding}` : ""};
`;

const ImageBox = styled.div`
  margin: ${(props) => props.img_box_margin};
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
  width: ${(props) => props.il_width};
  height: ${(props) => props.il_height};
  border: ${(props) => props.il_border};
  border-radius: 3px;
  background-image: url("${(props) => props.src}");

  background-size: contain;
  background-position: center;
  ${(props) =>
    props.il_bg_repeat ? `background-repeat: ${props.il_bg_repeat}` : ""};
`;
export default EditImage;
