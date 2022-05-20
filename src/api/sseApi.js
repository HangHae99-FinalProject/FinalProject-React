import axios from "axios";
import Cookies from "universal-cookie";
import instance from "./api";
const cookies = new Cookies();
const accessToken = cookies.get("accessToken");

export const unreadMessage = async () => {
  return await instance.get(`/sub`);
};
