import instance from "./api";

export const commentApi = {
  postComment: (postId, comment) =>
    instance.post("api/comment", { postId, comment }),
  getPost: () => instance.get("/api/category"),
  getDetail: (postId) => instance.get(`/api/post/${postId}`),
};
