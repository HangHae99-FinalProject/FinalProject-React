import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { memberIdCheckRE, nicknameCheckRE, pwCheckRE } from "../shared/common";
import axios from "axios";

//MUI import
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Spinner from "./Spinner";
import styled from "styled-components";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "595px",
  height: "555px",
  bgcolor: "background.paper",
  boxShadow: 0,
  borderRadius: "14px",
};
const OAuthRedirect = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState("");
  const [major, setMajor] = React.useState("");
  const [checkNicknameError, setCheckNicknameError] = React.useState(null);

  const profileSet = useSelector((state) => state.user.profileSet);
  const kakaoId = useSelector((state) => state.user.kakaoId);

  let code = new URL(window.location.href).searchParams.get("code");

  // 헬퍼텍스트 -닉네임, 전공
  function NicknameFormHelperText() {
    const { focused, filled } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "예. 영문 대소문자, 한글, 숫자 포함 2~6자 입니다.";
      } else if (filled !== true) {
        return " ";
      } else if (!nicknameCheckRE(nickname)) {
        return "닉네임 형식을 확인해주세요.";
      } else if (checkNicknameError === false) {
        return "중복된 닉네임입니다.";
      } else if (checkNicknameError === true) {
        return "사용 가능한 닉네임입니다.";
      }
      return " ";
    }, [focused, filled]);

    return (
      <FormHelperText sx={{ margin: "0", height: "20px" }}>
        {helperText}
      </FormHelperText>
    );
  }

  function MajorFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      return " ";
    }, [focused]);

    return (
      <FormHelperText sx={{ margin: "0", height: "20px" }}>
        {helperText}
      </FormHelperText>
    );
  }
  // 여기까지 헬퍼텍스트 -닉네임, 전공

  const onNicknameHandler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };
  const onMajorHandler = (e) => {
    setMajor(e.target.value);
  };

  //중복확인 버튼
  const nicknameCheckBtn = async () => {
    try {
      const checkNickname = await axios.post(
        "https://everymohum.shop/user/nicknameCheck",
        {
          nickname,
          major,
        }
      );

      checkNickname.status == 200 && setCheckNicknameError(true);
      // window.alert("사용이 가능한 아이디입니다.");
    } catch (err) {
      setCheckNicknameError(false);
      // window.alert("중복된 아이디입니다.");
    }
  };
  //여기까지 중복확인 버튼

  //추가정보기입 모달
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //여기까지 추가정보기입 모달

  //추가정보기입후 회원가입 완료
  const goAdditionalInfo = () => {
    if (!nicknameCheckRE(nickname)) {
      Swal.fire({
        title: "닉네임 형식을 확인해주세요!",
        icon: "warning",
      });

      return;
    }
    dispatch(userActions.__additionalInfo(kakaoId, nickname, major));
  };
  useEffect(() => {
    if (profileSet === false) {
      handleOpen();
    } else {
      return;
    }
  }, [profileSet]);

  useEffect(() => {
    dispatch(userActions.__kakaoLogin(code));
  }, []);
  //여기까지 추가정보기입후 회원가입 완료

  return (
    <React.Fragment>
      <BgDiv />
      <Spinner />
      {/* 추가정보 기입 모달 */}
      <Grid>
        <Modal
          open={open} //모달 열기
          onClose={handleClose} //모달 닫기
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form
            onSubmit={(event) => {
              event.preventDefault();
              goAdditionalInfo();
            }}
          >
            <Box sx={style}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={require(`../assets/fixedSignupLogo.png`)}
                  alt="signupLogo"
                  style={{ padding: "80px 0 0 0 " }}
                />
                <FormControl>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ marginTop: "69px", width: "430px" }}
                  >
                    <OutlinedInput
                      required
                      name="nickname"
                      type="text"
                      id="myNickname"
                      placeholder="닉네임을 입력해 주세요"
                      variant="standard"
                      onChange={onNicknameHandler}
                      sx={{
                        marginRight: "21px",
                        width: "276px",
                        height: "62px",
                        borderRadius: "14px",
                        fontSize: "20px",
                        boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                      }}
                    />
                    <Grid>
                      <Button
                        variant="contained"
                        onClick={nicknameCheckBtn}
                        sx={{
                          width: "132px",
                          height: "62px",
                          padding: "0",
                          border: "0",
                          borderRadius: "14px",
                          fontSize: "20px",
                          color: "#2967AC",
                          backgroundColor: "#D7F1FD",
                          "&:hover": {
                            backgroundColor: "#D7F1FD",
                            boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                          },
                          boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        중복확인
                      </Button>
                    </Grid>
                  </Grid>
                  <NicknameFormHelperText />
                </FormControl>
                <Grid sx={{ marginTop: "10px" }}>
                  <Box>
                    <FormControl fullWidth>
                      <Select
                        required
                        labelId="major"
                        id="demo-simple-select"
                        value={major}
                        displayEmpty
                        onChange={onMajorHandler}
                        inputProps={{ "aria-label": "select major" }}
                        MenuProps={{
                          PaperProps: {
                            sx: { maxHeight: 250 },
                          },
                        }}
                        sx={{
                          width: "430px",
                          height: "62px",
                          borderRadius: "14px",
                          fontSize: "20px",
                          boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        <MenuItem disabled value="">
                          <em
                            style={{
                              color: "#888888",
                              fontStyle: "normal",
                              margin: "auto",
                              fontSize: "20px",
                            }}
                          >
                            전공을 선택해 주세요
                          </em>
                        </MenuItem>
                        <MenuItem
                          value={"디자인"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          디자인
                        </MenuItem>
                        <MenuItem
                          value={"프로그래밍"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          프로그래밍
                        </MenuItem>
                        <MenuItem
                          value={"영상"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          영상
                        </MenuItem>
                        <MenuItem
                          value={"사진"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          사진
                        </MenuItem>
                        <MenuItem
                          value={"모델"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          모델
                        </MenuItem>
                        <MenuItem
                          value={"배우"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          배우
                        </MenuItem>
                        <MenuItem
                          value={"성우"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          성우
                        </MenuItem>
                        <MenuItem
                          value={"음향"}
                          sx={{ justifyContent: "center", fontSize: "20px" }}
                        >
                          음향
                        </MenuItem>
                      </Select>
                      <MajorFormHelperText />
                    </FormControl>
                  </Box>
                </Grid>
                <Box sx={{ marginTop: "10px" }}>
                  {checkNicknameError === false ? (
                    <Button
                      disabled
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "430px",
                        height: "62px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        border: "0",
                        borderRadius: "14px",
                        backgroundColor: "#2967AC",
                        "&:disabled": { backgroundColor: "gray" },
                      }}
                    >
                      등록완료
                    </Button>
                  ) : checkNicknameError === null ? (
                    <Button
                      disabled
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "430px",
                        height: "62px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        border: "0",
                        borderRadius: "14px",
                        backgroundColor: "#2967AC",
                        "&:disabled": { backgroundColor: "gray" },
                      }}
                    >
                      등록완료
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "430px",
                        height: "62px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        border: "0",
                        borderRadius: "14px",
                        backgroundColor: "#FE674C",
                        "&:hover": {
                          backgroundColor: "#FE674C",
                          boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                        },
                        boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      등록완료
                    </Button>
                  )}
                </Box>
              </Grid>
            </Box>
          </form>
        </Modal>
      </Grid>
      {/* 여기까지가 추가정보 기입 모달 */}
    </React.Fragment>
  );
};

const BgDiv = styled.div`
  margin-top: 256px;
  z-index: 0;
  height: 100%;
  background-image: url("https://velog.velcdn.com/images/tty5799/post/132ac619-d569-4005-9052-3ff8e28d5b6d/image.png");
  background-repeat: no-repeat;
  height: 765px;
  background-size: corver;
  background-position-y: bottom;
`;

export default OAuthRedirect;
