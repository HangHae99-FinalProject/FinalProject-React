import instance from "./api";

export const userApi = {
  signUp: (email, password, pwCheck, nickname) => {
    instance.post("/user/signup", { email, password, pwCheck, nickname });
  },
  idCheck: (email) => {
    instance.post("/user/emailCheck", { email });
  },
  nameCheck: (nickname) => {
    instance.post("/user/nicknameCheck", { nickname });
  },
  login: (email, password) => {
    instance.post("/user/login", { email, password });
  },
  remove: () => {
    instance.delete("/user/remove");
  },
};
