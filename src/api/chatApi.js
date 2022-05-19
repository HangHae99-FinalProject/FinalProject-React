import instance from "./api";

export const chatApi = {
  addRoom: (data) => instance.post("api/room", data),
  roadRoom: () => instance.get("api/room"),
  roadMessage: (data) => instance.post(`api/message`, data),
  // roomCount: (data) => instance.post("api/roomcount", data),
  // sendMessage : ()
};
