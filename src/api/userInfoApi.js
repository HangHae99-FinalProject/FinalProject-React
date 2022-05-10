import instance from "./api";
import axios from "axios";
import Cookies from "universal-cookie";

import { useSelector } from "react-redux";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");

export const userInfoApi = {
  getUserInfo: (userId = localStorage.getItem("userId")) => instance.get(`/user/info/${userId}`),

  getAppliedList: () =>
    instance.get("/user/applied", { headers: { Authorization: `Bearer ${accessToken}` } }),

  getRecruitList: (userId = localStorage.getItem("userId")) =>
    instance.get(`/user/recruiting/${userId}`),

  getApplierList: (postId) => instance.get(`/user/apply/${postId}`),

  getRecruitOverList: (userId = localStorage.getItem("userId")) =>
    instance.get(`/user/over/${userId}`),

  getAppliedOverList: (postId) => instance.get(`/user/recruiting/evaluation/${postId}`),

  postEvaluation: () =>
    instance.post("/user/recruiting/evaluation", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  putUserInfoModData: (userId = localStorage.getItem("userId")) =>
    instance.put(`/user/Info/${userId}/modify`),
};
