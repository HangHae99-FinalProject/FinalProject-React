import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { memberIdCheckRE, nicknameCheckRE, pwCheckRE } from "../shared/common";
import styled from "styled-components";
import kakao from "../assets/kakao.png";
import axios from "axios";

//MUI import
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Grid_2 from "@mui/material/Grid";
import Grid from "../elements/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Cookies from "universal-cookie";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";

const cookies = new Cookies();

//추가 정보 기입 모달
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

const Login = ({ location }) => {
  const dispatch = useDispatch();
  const [memberId, setmemberId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [nickname, setNickname] = React.useState(""); //
  const [major, setMajor] = React.useState(""); //
  const [checkNicknameError, setCheckNicknameError] = React.useState(null); //

  const is_additionalInfo = useSelector((state) => state.user.isAdditionalInfoState);

  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const loginErrorCode = useSelector((state) => state.user.loginErrorCode);

  if (location?.state) {
    localStorage.setItem("from", location?.state?.from);
  }

  const token = cookies.get("accessToken", { path: "/" });

  // 헬퍼텍스트 -아이디, 패스워드, 닉네임, 전공
  function IdFormHelperText() {
    const { focused, filled } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "예. 영문 대소문자, 숫자 포함 4~12자 입니다.";
      } else if (filled !== true) {
        return " ";
      } else if (loginErrorCode === "404") {
        return "해당 아이디가 존재하지 않습니다.";
      }
      return " ";
    }, [focused, filled]);

    return (
      <FormHelperText sx={{ margin: "0", height: "20px" }}>
        {helperText}
      </FormHelperText>
    );
  }
  function PwFormHelperText() {
    const { focused, filled } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "비밀번호는 영문 대소문자, 숫자 포함 6~20자 입니다.";
      } else if (filled !== true) {
        return " ";
      } else if (loginErrorCode === "400") {
        return "비밀번호가 틀렸습니다. 다시 입력해주세요.";
      } else if (!pwCheckRE(password)) {
        return "비밀번호 형식을 확인해주세요.";
      }
      return " ";
    }, [focused, filled]);

    return (
      <FormHelperText sx={{ margin: "0", height: "20px" }}>
        {helperText}
      </FormHelperText>
    );
  }
  function NicknameFormHelperText() {
    //
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

    return <FormHelperText sx={{ margin: "0", height: "20px" }}>{helperText}</FormHelperText>;
  }
  function MajorFormHelperText() {
    //
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      return " ";
    }, [focused]);

    return <FormHelperText sx={{ margin: "0", height: "20px" }}>{helperText}</FormHelperText>;
  }
  // 여기까지 헬퍼텍스트 -아이디, 패스워드, 닉네임, 전공

  //중복확인 버튼
  const nicknameCheckBtn = async () => {
    //
    try {
      const checkNickname = await axios.post("https://everymohum.shop/user/nicknameCheck", {
        nickname,
        major,
      });
      checkNickname.status == 200 && setCheckNicknameError(true);
      // window.alert("사용이 가능한 아이디입니다.");
    } catch (err) {
      setCheckNicknameError(false);
      // window.alert("중복된 아이디입니다.");
    }
  };
  //여기까지 중복확인 버튼

  const onLoginHandler = () => {
    window.location.href = kakaoUrl;
  };
  const onMemberIdHandler = (e) => {
    setmemberId(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onNicknameHandler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };
  const onMajorHandler = (e) => {
    setMajor(e.target.value);
  };

  const goSignUp = () => {
    history.push("/signup");
  };

  const goLogin = () => {
    if (!memberIdCheckRE(memberId)) {
      Swal.fire({
        title: "아이디 형식을 확인해주세요!",
        icon: "warning",
      });

      return;
    }
    if (!pwCheckRE(password)) {
      return;
    }
    dispatch(userActions.__login(memberId, password));
  };

  if (location?.state) {
    localStorage.setItem("from", location?.state?.from);
  }

  //추가정보기입 모달
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //여기까지 추가정보기입 모달

  //추가정보기입 완료
  const goAdditionalInfo = () => {
    if (!nicknameCheckRE(nickname)) {
      window.alert("닉네임 형식을 확인해주세요.");
      return;
    }
    const _userId = localStorage.getItem("userId");
    dispatch(userActions.__additionalInfo(_userId, nickname, major));
  };
  //여기까지 추가정보기입 완료

  React.useEffect(() => {
    if (token) {
      Swal.fire({
        title: "이미 로그인을 하셨습니다!",
        icon: "error",
      });
      history.replace("/main");
    }
  }, []);

  React.useEffect(() => {
    if (is_additionalInfo === true) {
      history.replace("/main");
    } else if (is_additionalInfo === false) {
      setOpen(true);
    }
  }, [is_additionalInfo]);

  return (
    <React.Fragment>
      {/* 추가정보 기입 모달 */}
      <Grid_2>
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
              <Grid_2
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
                  <Grid_2
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
                    <Grid_2>
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
                            boxShadow: "0px 0px 0px",
                          },
                          boxShadow: "0px 0px 0px",
                        }}
                      >
                        중복확인
                      </Button>
                    </Grid_2>
                  </Grid_2>
                  <NicknameFormHelperText />
                </FormControl>
                <Grid_2 sx={{ marginTop: "10px" }}>
                  <Box>
                    <FormControl fullWidth>
                      <Select
                        // IconComponent={() => (
                        //   <KeyboardArrowDownRoundedIcon
                        //     fontSize="large"
                        //     sx={{ color: "#2967AC", pointerEvents: "none" }}
                        //   />
                        // )}
                        required
                        // autoWidth
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
                </Grid_2>
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
                          boxShadow: "0",
                        },
                        boxShadow: "0",
                      }}
                    >
                      등록완료
                    </Button>
                  )}
                </Box>
              </Grid_2>
            </Box>
          </form>
        </Modal>
      </Grid_2>
      {/* 여기까지가 추가정보 기입 모달 */}
      <BgDiv>
        <Grid is_center margin="auto auto">
        <div style={{ marginBottom: "45px" }}>
            {open === true ? null : (
              <img
                src={require(`../assets/fixedSignupLogo.png`)}
                alt="signupLogo"
              />
            )}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              goLogin();
            }}
          >
            <div>
              <FormControl sx={{}}>
                <OutlinedInput
                  required
                  id="_memberId"
                  placeholder="아이디를 입력해 주세요"
                  variant="standard"
                  onChange={onMemberIdHandler}
                  sx={{
                    width: "430px",
                    height: "62px",
                    borderRadius: "14px",
                    backgroundColor: "white",
                    fontSize: "20px",
                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                  }}
                />
                <IdFormHelperText />
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ marginTop: "10px" }}>
                <OutlinedInput
                  required
                  type="password"
                  id="_password"
                  placeholder="비밀번호를 입력해 주세요"
                  variant="standard"
                  onChange={onPasswordHandler}
                  sx={{
                    width: "430px",
                    height: "62px",
                    borderRadius: "14px",
                    backgroundColor: "white",
                    fontSize: "20px",
                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                  }}
                />
                <PwFormHelperText />
              </FormControl>
            </div>
            <Grid margin="10px 0 0 0">
              <Stack direction="column">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    width: "430px",
                    height: "52px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    border: "0",
                    borderRadius: "14px",
                    backgroundColor: "#2967AC",
                    "&:hover": {
                      backgroundColor: "#2967AC",
                      boxShadow: "0",
                    },
                    boxShadow: "0",
                  }}
                >
                  모험 시작하기
                </Button>
                <Button
                  variant="contained"
                  onClick={onLoginHandler}
                  sx={{
                    marginTop: "20px",
                    width: "430px",
                    height: "52px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    border: "0",
                    borderRadius: "14px",
                    cursor: "pointer",
                    backgroundColor: "#FFD082",
                    "&:hover": {
                      backgroundColor: "#FFD082",
                      boxShadow: "0",
                    },
                    boxShadow: "0",
                  }}
                >
                  카카오 로그인
                  <img src={kakao} alt="kakao" style={{ marginLeft: "10px" }} />
                </Button>
                <Button
                  variant="contained"
                  onClick={goSignUp}
                  sx={{
                    marginTop: "20px",
                    width: "430px",
                    height: "52px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    border: "0",
                    borderRadius: "14px",
                    backgroundColor: "#FE674C",
                    "&:hover": {
                      backgroundColor: "#FE674C",
                      boxShadow: "0",
                    },
                    boxShadow: "0",
                  }}
                >
                  회원가입
                </Button>
              </Stack>
            </Grid>
          </form>
        </Grid>
      </BgDiv>
    </React.Fragment>
  );
};

const BgDiv = styled.div`
  margin-top: 256px;
  z-index: 9999;
  height: auto;
  background-image: url("https://velog.velcdn.com/images/tty5799/post/132ac619-d569-4005-9052-3ff8e28d5b6d/image.png");
  background-repeat: no-repeat;
  height: 765px;
  background-size: corver;
  background-position-y: bottom;
`;

export default Login;

