import instance from "./api";
import { formDataApi } from "./api";

export const postApi = {
  postWrite: (formData) => formDataApi.post("/api/post", formData),
};
