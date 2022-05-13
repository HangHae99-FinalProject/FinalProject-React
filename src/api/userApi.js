import instance from "./api";
import axios from "axios";

export const userApi = {
  signup: (email, password, pwCheck, nickname, major) =>
    axios.post("/signup", { email, password, pwCheck, nickname, major }),

  emailCheck: (email) => axios.post("/user/email-check", {email}),

  nicknameCheck: (nickname) => axios.post("/nickname-check", nickname),

  login: (email, password) => axios.post("/login", { email, password }),

  remove: () => instance.delete("/user/remove"),
};
