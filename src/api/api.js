import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://3.34.135.82:8080/",
  headers: { "content-type": "application/json;charset=UTF-8" },
});

export default instance;
// 헤더에 토큰 보내기
instance.interceptors.request.use(function (config) {
  const accessToken = cookies.get("accessToken");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return config;
});

export const notLogin = axios.create({
  baseURL: "http://3.34.135.82:8080/",
  headers: {
    "content-type": "multipart/form-data",
  },
});

export const formDataApi = axios.create({
  baseURL: "http://3.34.135.82:8080/",
  headers: {
    "content-type": "multipart/form-data",
  },
});

formDataApi.interceptors.request.use(function (config) {
  const accessToken = cookies.get("accessToken");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;

  return config;
});
