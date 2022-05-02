import instance from "./api";

export const userApi = {
  signup: (email, password, pwCheck, nickname) =>
    // instance.post("/user/signup", { email, password, pwCheck, nickname });

    //json-server 테스트용입니다.
    instance.post("/users", { email, password, pwCheck, nickname }),
  idCheck: (email) => instance.post("/user/emailCheck", { email }),
  nameCheck: (nickname) => instance.post("/user/nicknameCheck", { nickname }),
  login: (email, password) =>
    // instance.post("/user/login", { email, password });

    // json-server 테스트용입니다.
    instance.post("/login", { email, password }),
  remove: () => instance.delete("/user/remove"),
};
