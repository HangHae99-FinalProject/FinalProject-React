import * as React from "react";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { memberIdCheckRE, pwCheckRE } from "../shared/common";
import kakaoBtn from "../assets/kakao_login.png";

//MUI import
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "../elements/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function IdFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "예. 영문 대소문자, 한글, 숫자 포함 4~12자 입니다.";
    }

    return "아이디를 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
function PwFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "비밀번호는 영문 대소문자, 숫자 포함 6~20자 입니다.";
    }

    return "비밀번호를 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

const Login = () => {
  const dispatch = useDispatch();
  const [memberId, setmemberId] = React.useState("");
  const [password, setPassword] = React.useState("");

  const apiKey = process.env.REACT_APP_KAKAO_API_KEY;
  const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${redirectUri}&response_type=code`;
  console.log(apiKey);
  console.log(redirectUri);
  console.log(kakaoUrl);

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
      window.alert("패스워드 형식을 확인해주세요.");
      return;
    }

    dispatch(userActions.__login(memberId, password));
  };

  return (
    <React.Fragment>
      <Grid is_center margin="80px auto">
        <div>
          <Typography variant="h3" gutterBottom component="div">
            Login
          </Typography>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            goLogin();
          }}
        >
          <div>
            <FormControl sx={{ width: "35ch" }}>
              <OutlinedInput
                required
                id="_memberId"
                placeholder="이메일를 입력해 주세요"
                variant="standard"
                onChange={onMemberIdHandler}
              />
              <IdFormHelperText />
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ width: "35ch", marginTop: "20px" }}>
              <OutlinedInput
                required
                type="password"
                id="_password"
                placeholder="비밀번호를 입력해 주세요"
                variant="standard"
                onChange={onPasswordHandler}
              />
              <PwFormHelperText />
            </FormControl>
          </div>
          <Grid is_center margin="30px auto">
            <Stack spacing={4} direction="row">
              <Button type="submit" variant="contained">
                Login
              </Button>
              <Button variant="outlined" onClick={goSignUp}>
                go to Sign Up
              </Button>
            </Stack>
          </Grid>
        </form>
        <img
          src={kakaoBtn}
          alt="kakaoLogin"
          onClick={() => {
            window.location.href = kakaoUrl;
          }}
        />
      </Grid>
    </React.Fragment>
  );
};

export default Login;
