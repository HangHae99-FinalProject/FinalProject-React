import * as React from "react";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";
import { emailCheckRE, nicknameCheckRE, pwCheckRE } from "../shared/common";

//MUI import
// import Grid from "../elements/Grid";
import Grid from "@mui/material/Grid";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

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

function MajorFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    return "전공을 선택해 주세요.";
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
  const [major, setMajor] = React.useState("");

  //중복검사 상태관리
  const [emailCheck, setEmailCheck] = React.useState(false);
  const [nicknameCheck, setNicknameCheck] = React.useState(false);

  
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
  const onMajorHandler = (e) => {
    setMajor(e.target.value);
  };
  console.log(major);
  const emailCheckBtn = () => {
    console.log("이메일체크:", email);
    dispatch(userActions.__emailCheck(email));
  };
  const nicknameCheckBtn = () => {
    console.log("닉네임체크:", nickname);
    // dispatch(userAction.__nicknameCheck(nickname))
  };

  const goHome = () => {
    history.push("/");
  };

  const goSignup = () => {
    if (!emailCheckRE(email)) {
      window.alert("이메일 형식을 확인해주세요.");
      return;
    }
    if (!nicknameCheckRE(nickname)) {
      window.alert("닉네임 형식을 확인해주세요.");
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
    dispatch(userActions.__signup(email, password, pwCheck, nickname, major));
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
                    placeholder="이메일을 입력해 주세요"
                    variant="standard"
                    onChange={onEmailHandler}
                    sx={{ width: "65%" }}
                  />
                  <Grid>
                    <Button
                      variant="outlined"
                      onClick={emailCheckBtn}
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
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            mt={2}
          >
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
                    name="nickname"
                    type="text"
                    id="_nickname"
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
          {/* 전공추가 */}
          <Grid sx={{ marginTop: "20px" }}>
            <Box sx={{ minWidth: 120 }}>
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
                    <em style={{ color: "#888888", fontStyle: "normal" }}>전공을 선택해 주세요</em>
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
