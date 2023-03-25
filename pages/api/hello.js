// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

function changePq() {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:3000/api/hello")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  });
}

changePq().then((data) => {
  // console.log(data);
});
