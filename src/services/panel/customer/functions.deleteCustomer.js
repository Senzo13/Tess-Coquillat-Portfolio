import axios from "axios";
export function DeleteCustomer(id, token) {
  const config = {
    method: "delete",
    url: `***********`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id,
    },
  };
  return axios(config);
}
