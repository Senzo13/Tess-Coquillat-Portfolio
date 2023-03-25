import axios from "axios";

export async function editUser(
  token,
  id,
  nomPrenom,
  email,
  zipCode,
  cityName,
  description,
  password,
  sexe
) {
  //DEBUG//
  // console.log(typeof token);
  // console.log(token);
  // console.log(id);
  // console.log(nomPrenom);
  // console.log(email);
  // console.log(zipCode);
  // console.log(cityName);
  // console.log(description);

  const config = {
    method: "put",
    url: "***********",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      id: id,
      adrmail: email,
      nomPrenom: nomPrenom,
      zipCode: zipCode,
      cityName: cityName,
      description: description,
    },
  };

  return await axios(config);
}
