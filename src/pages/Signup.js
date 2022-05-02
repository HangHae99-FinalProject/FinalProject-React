import * as React from "react";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

//MUI import
// import Grid from "../elements/Grid";
import Grid from "@mui/material/Grid";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function IdFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "예. abcd@efgh.com";
    }

    return "이메일을 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
function PwFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "영문 대소문자, 숫자 포함 6~20자 입니다.";
    }

    return "비밀번호를 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
function PwCfnFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "영문 대소문자, 숫자 포함 6~20자 입니다.";
    }

    return "비밀번호를 다시 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
function NicknameFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "영문 대소문자, 한글, 숫자 포함 4~10자 입니다.";
    }

    return "닉네임을 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

const Signup = () => {
  const dispatch = useDispatch();

  //입력 정보 상태 관리
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pwCheck, setPwCheck] = React.useState("");
  const [nickname, setNickname] = React.useState("");

  //중복검사 상태관리
  const [emailCheck, setEmailCheck] = React.useState(false);
  const [nicknameCheck, setNicknameCheck] = React.useState(false);

  const emailCheckBtn={}
  const nicknameCheckBtn={}



  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };
  const onPwCheckHandler = (e) => {
    setPwCheck(e.target.value);
  };
  const onNicknameHandler = (e) => {
    setNickname(e.target.value);
  };

  const goHome = () => {
    history.push("/");
  };
  return (
    <React.Fragment>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        margin="80px auto"
        padding="2px"
      >
        <div>
          <h3>Sign Up</h3>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            dispatch(userActions.__signup(email, password, pwCheck, nickname));
            // console.log({email, password, pwCheck, nickname});
          }}
        >
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <Grid item xs={8}>
              <FormControl sx={{ width: "115%" }}>
                <OutlinedInput
                  required
                  name="email"
                  type="text"
                  id="_email"
                  placeholder="이메일을 입력해 주세요"
                  variant="standard"
                  onChange={onEmailHandler}
                />
                <IdFormHelperText />
              </FormControl>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="stretch"
              xs={4}
              pb={3}
            >
              <Button variant="outlined"  onClick={emailCheckBtn} sx={{ width: "65%", height: "55px", padding: "0" }}>
                중복확인
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mt={2}
          >
            <Grid item xs={8}>
              <FormControl sx={{ width: "115%" }}>
                <OutlinedInput
                  required
                  name="nickname"
                  id="_nickname"
                  placeholder="닉네임을 입력해 주세요"
                  variant="standard"
                  onChange={onNicknameHandler}
                />
                <NicknameFormHelperText />
              </FormControl>
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="flex-start"
              xs={4}
            >
              <Button variant="outlined" onClick={nicknameCheckBtn} sx={{ width: "65%", height: "55px", padding: "0" }}>
                중복확인
              </Button>
            </Grid>
          </Grid>
          <Grid>
            <FormControl sx={{ width: "35ch", marginTop: "20px" }}>
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
          <Grid>
            <FormControl sx={{ width: "35ch", marginTop: "20px" }}>
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
              <Button type="submit" variant="contained">
                Sign Up
              </Button>
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
