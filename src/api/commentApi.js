import instance from "./api";

export const commentApi = {
  postComment: (postId, comment) =>
    instance.post("api/comment", { postId, comment }),
  deleteComment: (commentId) => instance.delete(`/api/comment/${commentId}`),
  editComment: (commentId, comment) =>
    instance.put(`/api/comment/${commentId}`, { comment }),
};
