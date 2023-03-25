/* eslint-disable import/no-anonymous-default-export */
import { con as db } from "../db.js";
import { escapeHtml } from "../utils/espaceHtml.js";
import { checkHashedPassword } from "../utils/checkPasswordHash.js";
import { hashPassword } from "../utils/passwordHash.js";
import { generateToken } from "../utils/auth/jwt.js";
import { decodeJWT } from "../utils/jwtDecode.js";

const getAllUsers = async (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Error getAllUsers");
    }
  });
};

const apiTest = async (req, res) => {
  res.status(200).send("Public Content.");
  console.log("apiTestsss");
};

const authTest = async (req, res) => {
  res.status(200).send("Admin Content.");
};

const addProfileImagePanel = async (req, res) => {
  const user = {
    id: req.body.id,
  };
  const imgUrl = `${req.protocol}://${req.get("host")}/upload/${
    req.file.filename
  }`;
  const sqlUpdate = "UPDATE user SET imgUrl = ? WHERE id = ?";
  db.query(sqlUpdate, [imgUrl, user.id], (err, result) => {
    if (result) {
      res.status(200).send(imgUrl);
    } else {
      res.status(500).send("Error addProfileImagePanel");
    }
  });
};

const deleteCustomer = async (req, res) => {
  const id = req.body.id;
  const sqlDelete = "DELETE FROM customer WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).send("Customer deleted");
    } else {
      res.status(500).send("Error deleteCustomer");
    }
  });
};

const editCustomer = async (req, res) => {
  const id = req.body.id;
  const userId = req.body.userId;
  const nomPrenom = req.body.nomPrenom;
  const description = req.body.description;
  const stars = req.body.stars;
  const entreprise = req.body.entreprise;
  const imgUrl = req.body.imgUrl;

  const sqlUpdate =
    "UPDATE customer SET userId = ?, nomPrenom = ?, entreprise = ?, description = ?, imgUrl = ?, stars = ? WHERE id = ?";

  db.query(
    sqlUpdate,
    [userId, nomPrenom, entreprise, description, imgUrl, stars, id],
    (err, result) => {
      if (err) console.log(err);
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(500).send("Error uploadCustomer");
      }
    }
  );
};

const deletePortfolio = async (req, res) => {
  const id = req.body.id;
  const sqlDelete = "DELETE FROM upload WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).send("Image bien supprimée");
    } else {
      res.status(500).send("Error deletePortfolio");
    }
  });
};

const addCustomer = async (req, res) => {
  const userId = req.body.userId;
  const nomPrenom = req.body.nomPrenom;
  const description = req.body.description;
  const stars = req.body.stars;
  const entreprise = req.body.entreprise;
  const sqlUpdate =
    "INSERT INTO customer (userId, nomPrenom, entreprise, description, imgUrl, stars) VALUES (?,?,?,?,?,?)";
  const imgUrl = `${req.protocol}://${req.get("host")}/upload/${
    req.file.filename
  }`;
  db.query(
    sqlUpdate,
    [userId, nomPrenom, entreprise, description, imgUrl, stars],
    (err, result) => {
      if (err) console.log(err);
      if (result) {
        res.status(200).send(imgUrl);
      } else {
        res.status(500).send("Error uploadCustomer");
      }
    }
  );
};

const getCustomer = async (req, res) => {
  const sqlSelect = "SELECT * FROM customer";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Error getCustomer");
    }
  });
};

const userLogin = async (req, res) => {
  const email = escapeHtml(req.body.email);
  if (email.includes("@") && email.includes(".")) {
    const sqlSelect = "SELECT * FROM user WHERE adrMail = ?";
    db.query(sqlSelect, [email], async (err, result) => {
      console.log(result);
      if (
        result.length > 0 &&
        checkHashedPassword(req.body.password, result[0].pwd)
      ) {
        console.log("mon id : " + result[0].id);
        res.status(200).json({
          token: await generateToken(result[0].id),
        });
      } else if (result.length == 0)
        res.status(404).send("Erreur dans l'adresse mail ou le mot de passe");
      else
        res.status(400).send("Erreur dans l'adresse mail ou le mot de passe");
      if (err) res.status(500).send("Erreur dans la connexion avec le serveur");
    });
  } else {
    res
      .status(500)
      .json("Votre adresse email doit contenir un @ et un point !");
  }
};

const editUser = async (req, res) => {
  const user = {
    id: req.body.id,
    nomPrenom: req.body.nomPrenom,
    adrMail: req.body.adrmail,
    sexe: req.body.sexe,
    cityName: req.body.cityName,
    zipCode: req.body.zipCode,
    description: req.body.description,
  };

  const sqlUpdate =
    "UPDATE user SET adrMail = ?, nomPrenom = ?, cityName = ?, zipCode = ?, description = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [
      user.adrMail,
      user.nomPrenom,
      user.cityName,
      user.zipCode,
      user.description,
      user.id,
    ],
    (err, result) => {
      if (result) {
        res.status(200).send("Informations utilisateur modifiées");
      } else {
        res.status(500).send("Error editUser " + err.response.data);
      }
      if (err) {
        console.log("ERROR REQUEST BACK SERVER");
      }
    }
  );
};

const getAllDateUsers = async (req, res) => {
  // const id = req.params.id; // a voir pour delete etc
  db.query("SELECT date FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        token: jwt.sign({}, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        }),
      });
    }
  });
};

const writeUser = async (req, res) => {
  const nomPrenom = req.body.nomPrenom;
  const adrMail = req.body.adrmail;
  const sexe = req.body.sexe;
  const pwd = hashPassword(req.body.pwd);
  const cityName = req.body.cityName;
  const zipCode = req.body.zipCode;
  const description = req.body.description;
  const sqlInsert =
    "INSERT INTO user (adrMail, pwd, nomPrenom, cityName, zipCode, description, sexe) VALUES (?,?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [adrMail, pwd, nomPrenom, cityName, zipCode, description, sexe],
    (err, result) => {
      if (result) {
        res.status(200).send("User added");
      } else {
        res.status(500).send(err);
      }
    }
  );
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM user WHERE id = ?";
  db.query(sqlDelete, id, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).send("User deleted");
    } else {
      res.status(500).send("Error deleteUser");
    }
  });
};

const uploadImage = async (req, res) => {
  const id = req.body.id;
  const categorie = req.body.categorie;
  const sqlUpdate =
    "INSERT INTO upload (imgUrl, userId, categorie) VALUES (?,?,?)";
  const imgUrl = `${req.protocol}://${req.get("host")}/upload/${
    req.file.filename
  }`;
  db.query(sqlUpdate, [imgUrl, id, categorie], (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).send(imgUrl);
    } else {
      res.status(500).send("Error uploadImage");
    }
  });
};

const compteurDeVisite = async (req, res) => {
  const sqlSelect = "SELECT * FROM compteurdevisite";

  const ip = req.body.ip;
  const city = req.body.city;
  const country = req.body.country;
  const timestampdate = new Date().getTime() / 1000;

  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    if (result) {
      if (!result.some((e) => e.ip === ip)) {
        const sqlInsert =
          "INSERT INTO compteurdevisite (ip, city, country, timestampdate) VALUES (?,?,?,?)";
        db.query(
          sqlInsert,
          [ip, city, country, parseInt(timestampdate)],
          (err, result) => {
            if (err) console.log(err);
            if (result) {
              console.log("********************************************");
              console.log("\u001b[32mNouveau visiteur sur le site !");
              console.log(
                "\u001b[32mCity : " +
                  city +
                  "\n\u001b[32mCountry : " +
                  country +
                  "\n\u001b[32mIp : " +
                  ip +
                  "\n\u001b[32mTimestamp : " +
                  timestampdate +
                  "\u001b[0m"
              );
              console.log("********************************************");
              res.status(200).send("l'ip du visiteur est enregistrée");
            } else {
              res.status(500).send("Error server du compteurDeVisite");
            }
          }
        );
      } else {
        console.log("********************************************");
        console.log("\u001b[31mVisiteur régulié déjà enregistré !");
        console.log(
          "\u001b[31mCity : " +
            city +
            "\n\u001b[31mCountry : " +
            country +
            "\n\u001b[31mIp : " +
            ip +
            "\n\u001b[31mTimestamp : " +
            timestampdate +
            "\u001b[0m"
        );
        console.log("********************************************");
        res.status(200).send("l'ip du visiteur est déjà enregistrée");
      }
    } else {
      res.status(500).send("Error server du compteurDeVisite");
    }
  });
};

const countVisitors = async (req, res) => {
  const sqlSelect = "SELECT * FROM compteurdevisite";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).send(result); // renvoie les visiteurs
    } else {
      res.status(500).send("Error server du countVisitors");
    }
  });
};

const getAllImagesUrl = async (req, res) => {
  const sqlSelect = "SELECT * FROM upload";
  db.query(sqlSelect, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send("Error getAllImagesUrl");
    }
  });
};

const getOneUser = async (req, res) => {
  const id = decodeJWT(req.headers.authorization.split(" ")[1]);
  console.log("mon id : " + id);
  const sqlSelect = "SELECT * FROM user WHERE id = ?";
  db.query(sqlSelect, id, (err, result) => {
    if (err) console.log(err);
    if (result) {
      console.log("mon id : " + id);
      res.status(200).send(result);
    } else {
      res.status(500).send("Error getOneUser");
    }
  });
};

export default {
  getAllUsers,
  editUser,
  userLogin,
  getAllDateUsers,
  writeUser,
  deleteUser,
  uploadImage,
  compteurDeVisite,
  countVisitors,
  getAllImagesUrl,
  deleteCustomer,
  addProfileImagePanel,
  apiTest,
  authTest,
  addCustomer,
  getCustomer,
  editCustomer,
  deletePortfolio,
  getOneUser,
};
