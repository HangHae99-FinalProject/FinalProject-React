import * as React from "react";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { memberIdCheckRE, pwCheckRE } from "../shared/common";
import axios from "axios";
import styled from "styled-components";

//MUI import
import Grid from "@mui/material/Grid";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Signup = () => {
  const dispatch = useDispatch();

  //입력 정보 상태 관리
  const [memberId, setMemberId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pwCheck, setPwCheck] = React.useState("");
  const [checkMemberIdError, setCheckMemberIdError] = React.useState(null);

  // 헬퍼텍스트 -아이디, 패스워드, 패스워드확인
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

    return (
      <FormHelperText sx={{ margin: "0", height: "20px" }}>
        {helperText}
      </FormHelperText>
    );
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

    return (
      <FormHelperText sx={{ margin: "0", height: "20px" }}>
        {helperText}
      </FormHelperText>
    );
  }
  // 여기까지 헬퍼텍스트 -아이디, 패스워드, 패스워드확인

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

  //중복확인 버튼
  const memberIdCheckBtn = async () => {
    try {
      const checkMemberId = await axios.post(
        "https://everymohum.shop/user/memberIdCheck",
        {
          memberId,
        }
      );
      checkMemberId.status == 200 && setCheckMemberIdError(true);
      // window.alert("사용이 가능한 아이디입니다.");
    } catch (err) {
      setCheckMemberIdError(false);
      // window.alert("중복된 아이디입니다.");
    }
  };
  //여기까지 중복확인 버튼

  const goHome = () => {
    history.push("/");
  };

  //goSignup()시 추가정보기입 모달 오픈
  const goSignup = () => {
    if (!pwCheckRE(password)) {
      return;
    }
    if (password !== pwCheck) {
      return;
    }
    dispatch(userActions.__signup(memberId, password, pwCheck));
    history.replace("/login");
  };

  React.useEffect(() => {});

  return (
    <React.Fragment>
      <BgDiv>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <div style={{ marginBottom: "45px" }}>
              <img src={require(`../assets/fixedSignupLogo.png`)} alt="signupLogo"/>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              goSignup();
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <FormControl>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ width: "430px" }}
                >
                  <OutlinedInput
                    required
                    name="email"
                    type="text"
                    id="_email"
                    placeholder="아이디를 입력해 주세요"
                    variant="standard"
                    onChange={onMemberIdHandler}
                    sx={{
                      width: "276px",
                      height: "62px",
                      borderRadius: "14px",
                      backgroundColor: "white",
                      fontSize: "20px",
                      boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={memberIdCheckBtn}
                    sx={{
                      width: "132px",
                      height: "62px",
                      padding: "0",
                      color: "#2967AC",
                      borderRadius: "14px",
                      border: "0",
                      fontSize: "20px",
                      backgroundColor: "#D7F1FD",
                      "&:hover": {
                        backgroundColor: "#D7F1FD",
                        boxShadow: "0",
                      },
                      boxShadow: "0px 0px 0px",
                    }}
                  >
                    중복확인
                  </Button>
                </Grid>
                <IdFormHelperText />
              </FormControl>
            </Grid>
            <Grid sx={{ marginTop: "10px" }}>
              <FormControl>
                <OutlinedInput
                  required
                  name="password"
                  type="password"
                  id="_password"
                  placeholder="비밀번호를 입력해 주세요"
                  variant="standard"
                  onChange={onPasswordHandler}
                  sx={{
                    borderRadius: "14px",
                    backgroundColor: "white",
                    width: "430px",
                    height: "62px",
                    fontSize: "20px",
                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                  }}
                />
                <PwFormHelperText />
              </FormControl>
            </Grid>
            <Grid sx={{ marginTop: "10px" }}>
              <FormControl>
                <OutlinedInput
                  required
                  name="pwCheck"
                  type="password"
                  id="_pwCheck"
                  placeholder="비밀번호를 다시 입력해 주세요"
                  variant="standard"
                  onChange={onPwCheckHandler}
                  sx={{
                    borderRadius: "14px",
                    backgroundColor: "white",
                    width: "430px",
                    height: "62px",
                    fontSize: "20px",
                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                  }}
                />
                <PwCfnFormHelperText />
              </FormControl>
            </Grid>

            <Grid
              sx={{ marginTop: "10px" }}
            >
              <Stack direction="column">
                {checkMemberIdError === false ? (
                  <Button
                    disabled
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
                      "&:disabled": { backgroundColor: "gray" },
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
                      width: "430px",
                      height: "52px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                      border: "0",
                      borderRadius: "14px",
                      backgroundColor: "#2967AC",
                      "&:disabled": { backgroundColor: "gray" },
                    }}
                  >
                    회원가입
                  </Button>
                ) : (
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
                    회원가입
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={goHome}
                  sx={{
                    width: "430px",
                    height: "52px",
                    marginTop: "20px",
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
                  취소
                </Button>
                {/* <button onClick={handleOpen}>모달테스트</button> */}
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
  z-index: 0;
  height: 100%;
  background-image: url("https://velog.velcdn.com/images/tty5799/post/132ac619-d569-4005-9052-3ff8e28d5b6d/image.png");
  background-repeat: no-repeat;
  height: 765px;
  background-size: corver;
  background-position-y: bottom;
`;

export default Signup;
