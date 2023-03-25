import axios from "axios";

export const getOneUser = async (token) => {
  const config = {
    method: "get",
    url: "***********",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await axios(config);
};
