import axios from "axios";
export const GetVisitor = async () => {
  const config = {
    method: "get",
    url: `***********`,
  };
  return await axios(config);
};
