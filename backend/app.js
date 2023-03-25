import bodyParser from "body-parser";
import express, { json as _json } from "express";
import { verify } from "./utils/auth/jwt.js";
import apiRoutes from "./routes/api.routes.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import https from "https";
import cors from "cors";
const app = express();
const port = 42;

app.use(bodyParser.json());

const options = {
  pfx: fs.readFileSync("./tess-coquilhat.fr.pfx"),
  passphrase: "********",
};

https.createServer(options, app).listen(port, () => {
  const allowedOriginsArray = ["https://tess-coquilhat.fr"];
  app.use(
    cors({
      origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        allowedOriginsArray.forEach((allowedOrigin) => {
          if (origin.includes(allowedOrigin)) {
            return callback(null, true);
          }
        });
      },
    })
  );

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");

    if (req.path.includes("/api") || req.path.includes("/upload")) {
      next();
    } else if (req.path.includes("/login")) {
      next();
    } else {
      console.log("Non API request");
      if (typeof req.headers.authorization == "string") {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
          return res
            .status(401)
            .json({ error: "Access denied. No token provided." });
        if (token == undefined || token == null)
          return res
            .status(401)
            .json({ error: "Access denied. No token provided." });
        try {
          verify(token)
            .then((decoded) => {
              if (decoded) {
                req.body.user = decoded;
                next();
              } else {
                res.status(400).json({ error: "Invalid token." });
              }
            })
            .catch((err) => {
              console.log(err);
              res
                .status(400)
                .json({ error: "Invalid signature authentification." });
            });
        } catch (ex) {
          res.status(400).send("Invalid token.");
        }
      } else {
        res.status(400).json({ error: "Access denied. No token provided." });
      }
    }
  });
  app.use("/upload", uploadRoutes);

  app.use("/api", apiRoutes);

  app.use("/auth", authRoutes);

  app.use(_json());
  const __filename = fileURLToPath(import.meta.url);

  const __dirname = path.dirname(__filename);

  app.use("/upload", express.static(path.join(__dirname, "upload")));
  console.log("Server started on port " + port);
});
