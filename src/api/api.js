import axios from "axios";

axios.defaults.withCredentials = true;
const instance = axios.create({
  baseURL: "https://sparta-hs.shop/",
});

// 헤더에 토큰 보내기
instance.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export default instance;
