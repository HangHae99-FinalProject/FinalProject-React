import { LocalMall, RepeatOneSharp } from "@mui/icons-material";
import axios, { Axios } from "axios";
import { useDispatch } from "react-redux";
import Cookies from "universal-cookie";

const cookies = new Cookies();

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "https://everymohum.shop/",
  headers: { "content-type": "application/json;charset=UTF-8" },
});

export default instance;
// 헤더에 토큰 보내기
instance.interceptors.request.use(function (config) {
  const accessToken = cookies.get("accessToken");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

//재발급 기능
// instance.interceptors.request.use(function (config) {
//   const accessToken = cookies.get("accessToken");
//   const refreshToken = cookies.get("refreshToken");
//   config.headers.common["Authorization"] = `Bearer ${accessToken}`;
//   config.headers.common["reAuthorization"] = `Bearer ${refreshToken}`;
//   return config;
// });

// let isTokenRefreshing = false;
// let refreshSubscribers = [];

// const isAccessToken = cookies.get("accessToken", { path: "/" }) ? true : false;
// const isRefreshToken = cookies.get("refreshToken", { path: "/" });
// console.log(isAccessToken);
// const isUserId = localStorage.getItem("userId");
// console.log(isUserId);

// const onTokenRefreshed = (accessToken) => {
//   refreshSubscribers.map((callback, idx) => {
//     // console.log(idx + "번째 재요청 완료");
//     return callback(accessToken);
//   });
// };

// const addRefreshSubscriber = (callback) => {
//   refreshSubscribers.push(callback);
// };

// console.log(instance);

// instance.interceptors.response.use(
//   (config) => {
//     return config;
//   },
//   async (error) => {
//     const { config, response } = error;
//     const { status } = response;
//     const originalRequest = config;
//     const dispatch = useDispatch();
//     console.log(error);
//     console.log(response);

//     if (isAccessToken === false) {
//       console.log(isAccessToken);
//       const tokenData = await axios.post("https://everymohum.shop/user/reissue", {
//         refreshToken: isRefreshToken,
//         userId: isUserId,
//       });
//       console.log(tokenData)
//       // cookies.set("accessToken", response.data.accessToken, {
//       //   path: "/",
//       //   maxAge: 3600, // 60분
//       // });
//       axios.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
//       originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
//       return axios(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

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
