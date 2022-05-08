import instance from "./api";

export const applyApi = {
  getSubscriber: (postId) => instance.get(`user/apply/${postId}?isAccepted=0`),
  getAccept: (postId) => instance.get(`user/apply/${postId}?isAccepted=1`),
  postRequest: (acceptedDto) =>
    instance.post("/user/apply/accepted", acceptedDto),
  postReject: (rejectDto) => instance.post("/user/apply/reject", rejectDto),
  deadlinePatch: (postId) => instance.patch(`/api/apply/${postId}/over`),
};
