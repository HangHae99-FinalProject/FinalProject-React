import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { memberIdCheckRE, nicknameCheckRE, pwCheckRE } from "../shared/common";
import axios from "axios";

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
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "480px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "예. 영문 대소문자, 한글, 숫자 포함 4~12자 입니다.";
      } else if (checkMemberIdError === false) {
        return "중복된 아이디입니다.";
      } else if (checkMemberIdError === true) {
        return "사용 가능한 아이디입니다.";
      }
      return " ";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function PwFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "영문 대소문자, 숫자 포함 6~20자 입니다.";
      }

      return " ";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function PwCfnFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "영문 대소문자, 숫자 포함 6~20자 입니다.";
      }

      return " ";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }
  function NicknameFormHelperText() {
    const { focused } = useFormControl() || {};

    const helperText = React.useMemo(() => {
      if (focused) {
        return "예. 영문 대소문자, 한글, 숫자 포함 4~10자 입니다.";
      } else if (checkNicknameError === false) {
        return "중복된 닉네임입니다.";
      } else if (checkNicknameError === true) {
        return "사용 가능한 닉네임입니다.";
      }

      return " ";
    }, [focused]);

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
    if (!memberIdCheckRE(memberId)) {
      window.alert("이메일 형식을 확인해주세요.");
      return;
    }
    if (!pwCheckRE(password)) {
      window.alert("패스워드 형식을 확인해주세요.");
      return;
    }
    if (password !== pwCheck) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다.");
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
                <FormControl sx={{ width: "100%" }}>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <OutlinedInput
                      required
                      name="nickname"
                      type="text"
                      id="myNickname"
                      placeholder="닉네임을 입력해 주세요"
                      variant="standard"
                      onChange={onNicknameHandler}
                      sx={{ width: "65%" }}
                    />
                    <Grid>
                      <Button
                        variant="outlined"
                        onClick={nicknameCheckBtn}
                        sx={{ width: "110px", height: "55px", padding: "0" }}
                      >
                        중복확인
                      </Button>
                    </Grid>
                  </Grid>
                  <NicknameFormHelperText />
                </FormControl>
                <Grid sx={{ marginTop: "20px" }}>
                  <Box sx={{ width: "480px" }}>
                    <FormControl fullWidth>
                      <Select
                        required
                        labelId="major"
                        id="demo-simple-select"
                        value={major}
                        displayEmpty
                        onChange={onMajorHandler}
                        inputProps={{ "aria-label": "select major" }}
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
                    <Button disabled type="submit" variant="contained">
                      등록완료
                    </Button>
                  ) : checkNicknameError === null ? (
                    <Button disabled type="submit" variant="contained">
                      등록완료
                    </Button>
                  ) : (
                    <Button type="submit" variant="contained">
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        margin="80px auto"
        padding="2px"
        src={require(`../assets/signupBackground.png`)}
      >
        <div>
          <h3>
            Sign Up
            {/* <button onClick={handleOpen}>임시 추가정보 기입</button> */}
          </h3>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            goSignup();
          }}
        >
          <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
            <Grid>
              <FormControl sx={{ width: "115%" }}>
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
                    sx={{ width: "65%" }}
                  />
                  <Grid>
                    <Button
                      variant="outlined"
                      onClick={memberIdCheckBtn}
                      sx={{ width: "110px", height: "55px", padding: "0" }}
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
            <FormControl sx={{ width: "35ch" }}>
              <OutlinedInput
                required
                name="password"
                type="password"
                id="_password"
                placeholder="비밀번호를 입력해 주세요"
                variant="standard"
                onChange={onPasswordHandler}
              />
              <PwFormHelperText />
            </FormControl>
          </Grid>
          <Grid sx={{ marginTop: "20px" }}>
            <FormControl sx={{ width: "35ch" }}>
              <OutlinedInput
                required
                name="pwCheck"
                type="password"
                id="_pwCheck"
                placeholder="비밀번호를 다시 입력해 주세요"
                variant="standard"
                onChange={onPwCheckHandler}
              />
              <PwCfnFormHelperText />
            </FormControl>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            margin="30px auto"
          >
            <Stack spacing={4} direction="row">
              {checkMemberIdError === false ? (
                <Button disabled type="submit" variant="contained">
                  Sign Up
                </Button>
              ) : checkMemberIdError === null ? (
                <Button disabled type="submit" variant="contained">
                  Sign Up
                </Button>
              ) : (
                <Button type="submit" variant="contained">
                  Sign Up
                </Button>
              )}
              {/* <Button type="submit" variant="contained">
                Sign Up
              </Button> */}
              <Button variant="outlined" onClick={goHome}>
                cancel
              </Button>
            </Stack>
          </Grid>
        </form>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
