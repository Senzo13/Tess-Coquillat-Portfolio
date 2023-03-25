import axios from "axios";
export const AddProfileImagePanel = async (id, img) => {
  if (img != null && img != undefined) {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("image", img);
    const config = {
      method: "put",
      url: "***********",
      // headers: {
      //     "Content-Type": "multipart/form-data",
      // },
      data: formData,
    };
    return await axios(config);
  }
};
