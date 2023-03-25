import axios from "axios";
import Cookies from "js-cookie";

export function DeletePortfolio(id) {
  const token = Cookies.get("token");
  const config = {
    method: "delete",
    url: "***********",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id,
    },
  };
  return axios(config);
}
