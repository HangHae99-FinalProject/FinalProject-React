import instance from "./api";

export const chatApi = {
  addRoom: (data) => instance.post("api/room", data),
  roadRoom: () => instance.get("api/room"),
  // sendMessage : ()
};
