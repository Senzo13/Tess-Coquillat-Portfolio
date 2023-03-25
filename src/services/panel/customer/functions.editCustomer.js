import axios from "axios";

export const EditCustomer = async (
  id,
  userId,
  nomPrenom,
  entreprise,
  description,
  imgUrl,
  stars,
  token
) => {
  const config = {
    method: "put",
    url: "***********",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id,
      userId: userId,
      nomPrenom: nomPrenom,
      description: description,
      entreprise: entreprise,
      imgUrl: imgUrl,
      stars: 6,
    },
  };

  return await axios(config);
};
