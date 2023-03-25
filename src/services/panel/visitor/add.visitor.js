import axios from "axios";
export const AddVisitor = async (ipUser, city, country) => {
  const config = {
    method: "post",
    url: `***********`,
    data: {
      ip: ipUser,
      city: city,
      country: country,
    },
  };
  return await axios(config);
};
