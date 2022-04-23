import axios from "axios";

axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: "https://sparta-hs.shop/",
});

export default api;