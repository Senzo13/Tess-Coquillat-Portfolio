import axios from "axios";

export const GetCustomer = async (id) => {
  const config = {
    method: "get",
    url: "***********:" + id,
  };
  return await axios(config);
};
