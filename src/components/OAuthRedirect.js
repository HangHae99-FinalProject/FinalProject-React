import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

const OAuthRedirect = () => {
  const dispatch = useDispatch();

  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    dispatch(userActions.__kakaoLogin(code));
  }, []);
  return null;
};

export default OAuthRedirect;
