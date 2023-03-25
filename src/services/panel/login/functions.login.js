import axios from "axios";

export async function login(email, password) {
  const config = {
    method: "post",
    url: "***********",
    data: {
      email: email,
      password: password,
    },
  };

  return await axios(config);
}
