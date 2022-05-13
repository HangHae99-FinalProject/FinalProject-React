import instance from "./api";
import { formDataApi } from "./api";
import { notLogin } from "./api";

export const postApi = {
  postWrite: (formData) => formDataApi.post("/api/post", formData),
  getPost: (page, region, major, searchKey, searchValue) =>
    notLogin.get(`/post/filter/${page}?region=${region}&major=${major}`),
  // getPost: (page, region, major, searchKey, searchValue) =>
  //   notLogin.get(
  //     `/post/filter/${page}?searchKey=${searchKey}&searchValue=${searchValue}`
  //   ),
  getDetail: (postId) => notLogin.get(`/api/post/${postId}`),
  loginGetDetail: (postId) => instance.get(`/api/post/${postId}`),
  editPost: (postId, formData) =>
    formDataApi.put(`api/post/${postId}`, formData),
  deletePost: (postId) => instance.delete(`api/post/${postId}`),
  postApply: (postId, data) => instance.post(`api/apply/${postId}`, data),
  deleteApply: (postId) => instance.delete(`api/apply/${postId}`),
};
