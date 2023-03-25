import axios from "axios";

export const UploadImage = async (id, img, selectedValue) => {
  // console.log(img);
  if (img != null && img != undefined) {
    const formData = new FormData();
    formData.append("id", id);
    console.log("choisis : " + selectedValue);
    formData.append("categorie", selectedValue);
    formData.append("image", img);
    const config = {
      method: "post",
      url: "***********",
      // headers: {
      //     "Content-Type": "multipart/form-data",
      // },
      data: formData,
    };
    return await axios(config);
  }
};
