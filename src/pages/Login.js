import * as React from "react";

import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { history } from "../redux/configureStore";

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

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onEmailHandler = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const goSignUp = () => {
    history.push("/signup");
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
            dispatch(userActions.__login(email, password))
            // console.log("이메일:", email, "암호:", password);
          }}
        >
          <div>
            <FormControl sx={{ width: "35ch" }}>
              <OutlinedInput
                required
                id="_email"
                placeholder="이메일를 입력해 주세요"
                variant="standard"
                onChange={onEmailHandler}
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
      </Grid>
    </React.Fragment>
  );
};

export default Login;
