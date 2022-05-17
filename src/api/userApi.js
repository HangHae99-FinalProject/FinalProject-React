import instance from "./api";
import axios from "axios";

export const userApi = {
  signup: (memberId, password, pwCheck) =>
    axios.post("/signup", { memberId, password, pwCheck }),

  memberIdCheck: (memberId) => axios.post("/user/memberIdCheck", {memberId}),

  nicknameCheck: (nickname) => axios.post("/nickname-check", nickname),

  login: (memberId, password) => axios.post("/login", { memberId, password }),

  remove: () => instance.delete("/user/remove"),
};
