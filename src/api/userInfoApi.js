import instance from "./api";
import axios from "axios";
import Cookies from "universal-cookie";
import { formDataApi } from "./api";

import { useSelector } from "react-redux";

const cookies = new Cookies();
const accessToken = cookies.get("accessToken");

export const userInfoApi = {
  getUserInfo: (userId) => instance.get(`/user/info/${userId}`),

  getAppliedList: (userId) => instance.get(`/user/applied/${userId}`),

  getRecruitList: (userId) => instance.get(`/user/recruiting/${userId}`),

  getApplierList: (postId) => instance.get(`/user/apply/${postId}`),

  getRecruitOverList: (userId) => instance.get(`/user/over/${userId}`),

  getAppliedOverList: (postId) =>
    instance.get(`/user/recruiting/evaluation/${postId}`),

  postEvaluation: (reqeustUserRate) =>
    instance.post("/user/recruiting/evaluation", reqeustUserRate),

  putUserInfoModData: (userId, formData) =>
    formDataApi.patch(`/user/info/${userId}/modify`, formData),

  emailCheck: (email) => instance.get(`/user/email?email=${email}`),
};
