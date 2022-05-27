import instance from "./api";

export const chatApi = {
  addRoom: (data) => instance.post("api/room", data),
  roadRoom: () => instance.get("api/room"),
  roadMessage: (data) => instance.post(`api/message`, data),
  notifications: () => instance.get("notifications"),
  notificationsCnt: () => instance.get("notifications/count"),
  notificationRead: (notificationId) =>
    instance.post(`/notification/read/
  ${notificationId}`),
  notificationDelete: (notificationId) =>
    instance.delete(`/notifications/delete/${notificationId}`),
};
