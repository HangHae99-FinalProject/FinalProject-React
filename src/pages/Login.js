import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { memberIdCheckRE, nicknameCheckRE, pwCheckRE } from "../shared/common";
import kakaoBtn from "../assets/kakao_login.png";
import styled from "styled-components";
import kakao from "../assets/kakao.png";

//MUI import
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "../elements/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Redirect } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = ({ location }) => {
  const dispatch = useDispatch();
  const [memberId, setmemberId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;

  const loginErrorCode = useSelector((state) => state.user.loginErrorCode);

  if (location?.state) {
    localStorage.setItem("from", location?.state?.from);
  }

  const isLogin = useSelector((state) => state.user.isLogin);
  const token = cookies.get("accessToken", { path: "/" });

  // 헬퍼텍스트 -아이디, 패스워드
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
  // 여기까지 헬퍼텍스트 -아이디, 패스워드

  const onLoginHandler = () => {
    window.location.href = kakaoUrl;
    // history.replace(`/${kakaoUrl}`);
  };

  const onMemberIdHandler = (e) => {
    setmemberId(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const goSignUp = () => {
    history.push("/signup");
  };

  const goLogin = () => {
    if (!memberIdCheckRE(memberId)) {
      window.alert("아이디 형식을 확인해주세요.");
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

  React.useEffect(() => {
    console.log(isLogin);
    console.log(token);
    if (token) {
      alert("이미 로그인을 하셨습니다!");
      history.replace("/main");
    }
  }, []);

  return (
    <React.Fragment>
      <BgDiv>
        <Grid is_center margin="auto auto">
          <div style={{ marginBottom: "45px" }}>
            <img
              src={require(`../assets/fixedSignupLogo.png`)}
              alt="signupLogo"
            />
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
                      boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                    },
                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
                  }}
                >
                  모험 시작하기
                </Button>
                <Button
                  variant="contained"
                  // src={kakaoBtn}
                  // alt="kakaoLogin"
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
                      boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                    },
                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
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
                      boxShadow: "0px 0px 4px inset rgba(0, 0, 0, 0.25)",
                    },
                    boxShadow: "0px 4px 4px inset rgba(0, 0, 0, 0.25)",
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
  height: 100%;
  background-image: url("https://velog.velcdn.com/images/tty5799/post/132ac619-d569-4005-9052-3ff8e28d5b6d/image.png");
  background-repeat: no-repeat;
  height: 765px;
  background-size: corver;
  background-position-y: bottom;
`;

export default Login;
