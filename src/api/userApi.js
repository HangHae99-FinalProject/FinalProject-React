import instance, { notLogin } from "./api";
import axios from "axios";

export const userApi = {
  signup: (memberId, password, pwCheck) =>
    notLogin.post("/user/signup", { memberId, password, pwCheck }),

  memberIdCheck: (memberId) => axios.post("/user/memberIdCheck", { memberId }),

  nicknameCheck: (nickname) => axios.post("/nickname-check", nickname),

  login: (memberId, password) =>
    notLogin.post("user/login", { memberId, password }),

  remove: () => instance.delete("/user/remove"),

  kakaoGet: (code) => notLogin.get(`/user/kakao/login?code=${code}`),

  refreshToken: (accessToken, refreshToken, userId) =>
    instance.post("/user/reissue", { accessToken, refreshToken, userId }),
};
