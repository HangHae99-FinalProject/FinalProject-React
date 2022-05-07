import instance from "./api";

export const applyApi = {
  getSubscriber: (postId) => instance.get(`user/apply/${postId}?isAccepted=0`),
  getAccept: (postId) => instance.get(`user/apply/${postId}?isAccepted=1`),
  postRequest: (acceptedDto) =>
    instance.post("/user/apply/accepted", acceptedDto),
  deleteComment: (commentId) => instance.delete(`/api/comment/${commentId}`),
  editComment: (commentId, comment) =>
    instance.put(`/api/comment/${commentId}`, { comment }),
};
