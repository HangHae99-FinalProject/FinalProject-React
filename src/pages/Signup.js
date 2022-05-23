import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { memberIdCheckRE, nicknameCheckRE, pwCheckRE } from "../shared/common";
import axios from "axios";
import styled from "styled-components";
import BgImg from "../assets/signupBackground.png";

//MUI import
import Grid from "@mui/material/Grid";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

//추가 정보 기입 모달
const style = {
  position: "absolute",
  top: "340px",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "629px",
  height: "472px",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 0,
  p: 4,
  borderRadius: "14px",
};

const Signup = () => {
  const dispatch = useDispatch();

  //입력 정보 상태 관리
  const [memberId, setMemberId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pwCheck, setPwCheck] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [major, setMajor] = React.useState("");
  const [activationSignBtn, setActivationSignBtn] = React.useState(false);
  const [checkMemberIdError, setCheckMemberIdError] = React.useState(null);
  const [checkNicknameError, setCheckNicknameError] = React.useState(null);
  console.log(checkMemberIdError);

  // 헬퍼텍스트 -아이디, 패스워드, 패스워드확인, 닉네임, 전공
  function IdFormHelperText() {
    const { focused, filled } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "예. 영문 대소문자, 숫자 포함 4~12자 입니다.";
      } else if (filled !== true) {
        return " ";
      } else if (!memberIdCheckRE(memberId)) {
        return "아이디 형식을 확인해주세요.";
      } else if (checkMemberIdError === false) {
        return "중복된 아이디입니다.";
      } else if (checkMemberIdError === true) {
        return "사용 가능한 아이디입니다.";
      }
      return " ";
    }, [focused, filled]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function PwFormHelperText() {
    const { focused, filled } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "영문 대소문자, 숫자 포함 6~20자 입니다.";
      } else if (filled !== true) {
        return " ";
      } else if (!pwCheckRE(password)) {
        return "패스워드 형식을 확인해주세요.";
      } else if (password !== pwCheck) {
        return "패스워드와 패스워드 확인이 일치하지 않습니다.";
      }
      return " ";
    }, [focused, filled]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function PwCfnFormHelperText() {
    const { focused, filled } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "영문 대소문자, 숫자 포함 6~20자 입니다.";
      } else if (filled !== true) {
        return " ";
      } else if (password !== pwCheck) {
        return "패스워드와 패스워드 확인이 일치하지 않습니다.";
      }

      return " ";
    }, [focused, filled]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function NicknameFormHelperText() {
    const { focused, filled } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "예. 영문 대소문자, 한글, 숫자 포함 4~10자 입니다.";
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

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function MajorFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      return " ";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  // 여기까지 헬퍼텍스트 -아이디, 패스워드, 패스워드확인, 닉네임, 전공

  const onMemberIdHandler = (e) => {
    e.preventDefault();
    setMemberId(e.target.value);
  };
  const onPasswordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const onPwCheckHandler = (e) => {
    e.preventDefault();
    setPwCheck(e.target.value);
  };
  const onNicknameHandler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };
  const onMajorHandler = (e) => {
    setMajor(e.target.value);
  };
  // console.log(major);

  //중복확인 버튼
  const memberIdCheckBtn = async () => {
    try {
      const checkMemberId = await axios.post("https://everymohum.shop/user/memberIdCheck", {
        memberId,
      });
      console.log(checkMemberId.status);
      checkMemberId.status == 200 && setCheckMemberIdError(true);
      // window.alert("사용이 가능한 아이디입니다.");
    } catch (err) {
      console.log(err);
      setCheckMemberIdError(false);
      // window.alert("중복된 아이디입니다.");
    }
  };

  const nicknameCheckBtn = async () => {
    try {
      const checkNickname = await axios.post("https://everymohum.shop/user/nicknameCheck", {
        nickname,
        major,
      });
      console.log(checkNickname.status);
      checkNickname.status == 200 && setCheckNicknameError(true);
      // window.alert("사용이 가능한 아이디입니다.");
    } catch (err) {
      console.log(err);
      setCheckNicknameError(false);
      // window.alert("중복된 아이디입니다.");
    }
  };
  //여기까지 중복확인 버튼

  const goHome = () => {
    history.push("/");
  };

  //추가정보기입 모달
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //여기까지 추가정보기입 모달

  //goSignup()시 추가정보기입 모달 오픈
  const goSignup = () => {
    // if (!memberIdCheckRE(memberId)) {
    //   window.alert("아이디 형식을 확인해주세요.");
    //   return;
    // }
    if (!pwCheckRE(password)) {
      // window.alert("패스워드 형식을 확인해주세요.");
      return;
    }
    if (password !== pwCheck) {
      // window.alert("패스워드와 패스워드 확인이 일치하지 않습니다.");
      return;
    }
    dispatch(userActions.__signup(memberId, password, pwCheck));
    // console.log(memberId, password, pwCheck)
    handleOpen();
  };

  //추가정보기입후 회원가입 완료
  const goAdditionalInfo = () => {
    if (!nicknameCheckRE(nickname)) {
      window.alert("닉네임 형식을 확인해주세요.");
      return;
    }
    const _userId = localStorage.getItem("userId");
    dispatch(userActions.__additionalInfo(_userId, nickname, major));
    console.log(nickname, major);
  };

  React.useEffect(() => {});

  return (
    <React.Fragment>
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
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <img src={require(`../assets/signupLogo.png`)} alt="signupLogo" />
                <FormControl>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ marginTop: "79px" }}
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
                        width: "326px",
                        height: "62px",
                        borderRadius: "14px",
                        fontSize: "20px",
                      }}
                    />
                    <Grid>
                      <Button
                        variant="contained"
                        onClick={nicknameCheckBtn}
                        sx={{
                          width: "120px",
                          height: "62px",
                          padding: "0",
                          borderRadius: "14px",
                          fontSize: "20px",
                        }}
                      >
                        중복확인
                      </Button>
                    </Grid>
                  </Grid>
                  <NicknameFormHelperText />
                </FormControl>
                <Grid sx={{ marginTop: "20px" }}>
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
                        sx={{
                          width: "477px",
                          height: "62px",
                          borderRadius: "14px",
                          fontSize: "20px",
                        }}
                      >
                        <MenuItem disabled value="">
                          <em style={{ color: "#888888", fontStyle: "normal" }}>
                            전공을 선택해 주세요
                          </em>
                        </MenuItem>
                        <MenuItem value={"미술/디자인"}>미술/디자인</MenuItem>
                        <MenuItem value={"프로그래밍"}>프로그래밍</MenuItem>
                        <MenuItem value={"영상"}>영상</MenuItem>
                        <MenuItem value={"사진"}>사진</MenuItem>
                        <MenuItem value={"모델"}>모델</MenuItem>
                        <MenuItem value={"배우"}>배우</MenuItem>
                        <MenuItem value={"성우"}>성우</MenuItem>
                        <MenuItem value={"음향"}>음향</MenuItem>
                      </Select>
                      <MajorFormHelperText />
                    </FormControl>
                  </Box>
                </Grid>
                <Box>
                  {checkNicknameError === false ? (
                    <Button
                      disabled
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "477px",
                        height: "42px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        borderRadius: "14px",
                        backgroundColor: "#2967AC",
                        "&:hover": { backgroundColor: "#2967AC" },
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
                        width: "477px",
                        height: "42px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        borderRadius: "14px",
                        backgroundColor: "#2967AC",
                        "&:hover": { backgroundColor: "#2967AC" },
                      }}
                    >
                      등록완료
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        width: "477px",
                        height: "42px",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        borderRadius: "14px",
                        backgroundColor: "#2967AC",
                        "&:hover": { backgroundColor: "#2967AC" },
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
      <BgDiv>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          margin="80px auto auto auto"
        >
          <div style={{ marginBottom: "50px" }}>
            <img src={require(`../assets/signupLogo.png`)} alt="signupLogo" />
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              goSignup();
            }}
          >
            <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
              <Grid>
                <FormControl sx={{ width: "326px", height: "62px" }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <OutlinedInput
                      required
                      name="email"
                      type="text"
                      id="_email"
                      placeholder="아이디를 입력해 주세요"
                      variant="standard"
                      onChange={onMemberIdHandler}
                      sx={{ width: "65%", borderRadius: "14px" }}
                    />
                    <Grid>
                      <Button
                        variant="outlined"
                        onClick={memberIdCheckBtn}
                        sx={{
                          color: "black",
                          width: "110px",
                          height: "55px",
                          padding: "0",
                          borderRadius: "14px",
                          fontSize: "20px",
                          backgroundColor: "#D7F1FD",
                          "&:hover": { backgroundColor: "#D7F1FD" },
                        }}
                      >
                        중복확인
                      </Button>
                    </Grid>
                  </Grid>

                  <IdFormHelperText />
                </FormControl>
              </Grid>
            </Grid>
            <Grid sx={{ marginTop: "20px" }}>
              <FormControl sx={{ width: "326px", height: "62px" }}>
                <OutlinedInput
                  required
                  name="password"
                  type="password"
                  id="_password"
                  placeholder="비밀번호를 입력해 주세요"
                  variant="standard"
                  onChange={onPasswordHandler}
                  sx={{ borderRadius: "14px" }}
                />
                <PwFormHelperText />
              </FormControl>
            </Grid>
            <Grid sx={{ marginTop: "20px" }}>
              <FormControl sx={{ width: "326px", height: "62px" }}>
                <OutlinedInput
                  required
                  name="pwCheck"
                  type="password"
                  id="_pwCheck"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  variant="standard"
                  onChange={onPwCheckHandler}
                  sx={{ borderRadius: "14px" }}
                />
                <PwCfnFormHelperText />
              </FormControl>
            </Grid>

            <Grid
              sx={{ marginTop: "20px" }}
              // container
              // direction="column"
              // justifyContent="center"
              // alignItems="center"
              // margin="30px auto"
            >
              <Stack direction="column">
                {checkMemberIdError === false ? (
                  <Button
                    disabled
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "326px",
                      height: "42px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      borderRadius: "14px",
                      backgroundColor: "#2967AC",
                    }}
                  >
                    회원가입
                  </Button>
                ) : checkMemberIdError === null ? (
                  <Button
                    disabled
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "326px",
                      height: "42px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      borderRadius: "14px",
                      backgroundColor: "#2967AC",
                    }}
                  >
                    회원가입
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: "326px",
                      height: "42px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      borderRadius: "14px",
                      backgroundColor: "#2967AC",
                      "&:hover": { backgroundColor: "#2967AC" },
                    }}
                  >
                    회원가입
                  </Button>
                )}
                {/* <Button type="submit" variant="contained">
                Sign Up
              </Button> */}
                <Button
                  variant="outlined"
                  onClick={goHome}
                  sx={{
                    width: "326px",
                    height: "42px",
                    marginTop: "13px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "white",
                    borderRadius: "14px",
                    backgroundColor: "#FE5953",
                    "&:hover": { backgroundColor: "#FE5953" },
                  }}
                >
                  취소
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
  z-index: 0;
  height: 100%;
  background-image: url("https://velog.velcdn.com/images/tty5799/post/132ac619-d569-4005-9052-3ff8e28d5b6d/image.png");
  background-repeat: no-repeat;
  height: 765px;
  background-size: corver;
  background-position-y: bottom;
`;

export default Signup;
