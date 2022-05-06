import { instance } from "./api";
import axios from "axios";

export const userApi = {
  signup: (email, password, pwCheck, nickname, major) =>
    axios.post("user/signup", { email, password, pwCheck, nickname, major }),

  emailCheck: (email) => instance.post("/user/emailCheck", { email }),

  nicknameCheck: (nickname) => instance.post("/user/nicknameCheck", { nickname }),

  login: (email, password) => axios.post("user/login", { email, password }),

  remove: () => instance.delete("/user/remove"),

  getUserInfo: (userId) =>
    instance.get(`/user/info/${userId}`),
  // getUserInfo: (userId) =>
  //   instance.get(`/user/info/${userId}`, {
  //     data: {
  //       userId,
  //       nickname,
  //       profileImg,
  //       major,
  //       intro,
  //       introImgUrlList,
  //       projectCount,
  //       likeCount,
  //     },
  //   }),
};
