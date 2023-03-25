import axios from "axios";

export const AddCustomer = async (
  id,
  nomPrenom,
  entreprise,
  description,
  img,
  stars,
  token
) => {
  if (img != null && img != undefined) {
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("image", img);
    formData.append("nomPrenom", nomPrenom);
    formData.append("description", description);
    formData.append("entreprise", entreprise);
    formData.append("stars", 5);
    const config = {
      method: "post",
      url: "***********",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // headers: {
      //     "Content-Type": "multipart/form-data",
      // },
      data: formData,
    };
    return await axios(config);
  }
};
