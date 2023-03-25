import axios from "axios";

export const GetAllImagesUrl = async (id) => {
  const config = {
    method: "get",
    url: "***********:" + id,
  };
  return await axios(config);
};
