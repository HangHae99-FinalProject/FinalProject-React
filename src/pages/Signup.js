import * as React from "react";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "../elements/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { history } from "../redux/configureStore";
import Typography from "@mui/material/Typography";

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
      return "비밀번호는 영문 대소문자, 숫자 포함 6~20자 입니다.";
    }

    return "비밀번호를 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
function PwCfnFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "비밀번호는 영문 대소문자, 숫자 포함 6~20자 입니다.";
    }

    return "비밀번호를 다시 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
function NinknameFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "닉네임은 영문 대소문자, 한글, 숫자 포함 4~10자 입니다.";
    }

    return "닉네임을 입력해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

const Signup = () => {
  const goHome = () => {
    history.push("/");
  };
  return (
    <React.Fragment>
      <Grid is_center margin="80px auto">
        <div>
          <Typography variant="h3" gutterBottom component="div">
            Sign Up
          </Typography>
        </div>

        <div>
          <FormControl sx={{ width: "35ch" }}>
            <OutlinedInput
              required
              id="_id"
              placeholder="아이디를 입력해 주세요"
              variant="standard"
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
            />
            <PwFormHelperText />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ width: "35ch", marginTop: "20px" }}>
            <OutlinedInput
              required
              type="password"
              id="_cfmPassword"
              placeholder="비밀번호를 다시 입력해 주세요"
              variant="standard"
            />
            <PwCfnFormHelperText />
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ width: "35ch", marginTop: "20px" }}>
            <OutlinedInput
              required
              id="_nickname"
              placeholder="닉네임을 입력해 주세요"
              variant="standard"
            />
            <NinknameFormHelperText />
          </FormControl>
        </div>
        <Grid is_center margin="30px">
          <Stack spacing={4} direction="row">
            <Button variant="contained">Sign Up</Button>
            <Button variant="outlined" onClick={goHome}>
              cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Signup;
