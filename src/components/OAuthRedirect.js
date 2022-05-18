import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { memberIdCheckRE, nicknameCheckRE, pwCheckRE } from "../shared/common";
import axios from "axios";

//MUI import
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "../elements/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Spinner from "./Spinner";

function MajorFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    return "전공을 선택해 주세요.";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}
const OAuthRedirect = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = React.useState("");
  const [major, setMajor] = React.useState("");
  const [checkNicknameError, setCheckNicknameError] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const profileSet = useSelector((state) => state.user.profileSet);
  const kakaoId = useSelector((state) => state.user.kakaoId);

  let code = new URL(window.location.href).searchParams.get("code");

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

      return "닉네임을 입력해 주세요.";
    }, [focused]);

    return <FormHelperText>{helperText}</FormHelperText>;
  }

  const nicknameCheckBtn = async () => {
    try {
      const checkNickname = await axios.post(
        "https://everymohum.shop/user/nicknameCheck",
        {
          nickname,
          major,
        }
      );
      console.log(checkNickname.status);
      checkNickname.status == 200 && setCheckNicknameError(true);
      // window.alert("사용이 가능한 아이디입니다.");
    } catch (err) {
      console.log(err);
      setCheckNicknameError(false);
      // window.alert("중복된 아이디입니다.");
    }
  };
  const onNicknameHandler = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };
  const onMajorHandler = (e) => {
    setMajor(e.target.value);
  };

  const goAdditionalInfo = () => {
    if (!nicknameCheckRE(nickname)) {
      window.alert("닉네임 형식을 확인해주세요.");
      return;
    }

    // const _userId = localStorage.getItem("userId");
    dispatch(userActions.__additionalInfo(kakaoId, nickname, major));
    console.log(nickname, major);
  };
  useEffect(() => {
    if (profileSet === false) {
      console.log("??");
      handleOpen();
    } else {
      return;
    }
  }, [profileSet]);
  useEffect(() => {
    dispatch(userActions.__kakaoLogin(code));
    console.log(profileSet);
  }, []);

  return (
    <>
      <Spinner />
      {/* 추가정보 기입 모달 */}
      <Grid>
        <Modal
          open={open}
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
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <img
                  src={require(`../assets/signupLogo.png`)}
                  alt="signupLogo"
                />
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
    </>
  );
};

export default OAuthRedirect;
