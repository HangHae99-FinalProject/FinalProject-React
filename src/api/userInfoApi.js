import instance from "./api";
import axios from "axios";

// export const userInfoApi = {
//   userMod: (
//     profileImgUrl,
//     nickname,
//     is_cate,
//     intro,
//     portfolioLink,
//     currentImgUrl,
//     {imgs}
//   ) => instance.put("/user/Info/{userId}/modify", { nickname }),
// };
export const userInfoApi = {
  userMod: (
    profileImgUrl,
    nickname,
    is_cate,
    intro,
    portfolioLink,
    currentImgUrl,
    { imgs }
  ) =>
    instance.put(
      "/user/Info/{userId}/modify",
      (profileImgUrl,
      nickname,
      is_cate,
      intro,
      portfolioLink,
      currentImgUrl,
      { imgs })
    ),
};
