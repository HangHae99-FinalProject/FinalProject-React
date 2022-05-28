import { LocalMall, RepeatOneSharp } from "@mui/icons-material";
import axios, { Axios } from "axios";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { userApi } from "./userApi";

const cookies = new Cookies();

axios.defaults.withCredentials = true;

let isRefresh = false;

const instance = axios.create({
  baseURL: "https://everymohum.shop/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
  },
});

export default instance;
// 헤더에 토큰 보내기
instance.interceptors.request.use(
  function (config) {
    const accessToken = cookies.get("accessToken");
    if (!accessToken || isRefresh) return config;
    config.headers = {
      "Content-Type": "application/json; charset=UTF-8",
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },

  (err) => {
    console.log("요청 에러", err);
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (success) => {
    return success;
  },
  (err) => {
    if (err.response.status === 401) {
      isRefresh = true;
      const accessToken = cookies.get("accessToken");
      const refreshToken = cookies.get("refreshToken");
      const userId = localStorage.getItem("userId");
      return userApi
        .refreshToken(accessToken, refreshToken, userId)
        .then((res) => {
          console.log(res);
          const newAccessToken = res.data.data.accessToken;
          const newRefreshToken = res.data.data.refreshToken;
          console.log(newAccessToken);
          console.log(newRefreshToken);

          cookies.set("accessToken", newAccessToken, {
            path: "/",
          });
          cookies.set("refreshToken", newRefreshToken, {
            path: "/",
          });
          err.config.headers.Authorization = `Bearer ${newAccessToken}`;
          isRefresh = false;
          return instance.request(err.config);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return Promise.reject(err);
  }
);

export const notLogin = axios.create({
  baseURL: "https://everymohum.shop/",
  headers: {
    "content-type": "multipart/form-data",
  },
});

export const formDataApi = axios.create({
  baseURL: "https://everymohum.shop/",
  headers: {
    "content-type": "multipart/form-data",
  },
});

formDataApi.interceptors.request.use(function (config) {
  const accessToken = cookies.get("accessToken");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return config;
});
