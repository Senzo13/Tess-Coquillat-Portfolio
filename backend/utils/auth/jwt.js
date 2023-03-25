import dotenv from "dotenv";
import { SignJWT, jwtVerify } from "jose";
import create from "./create.secret.key.js";

dotenv.config();
const secret = create();

export const generateToken = async (user_id) => {
  return await new SignJWT({ user_id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer(process.env.APP_ISSUER)
    .setAudience("http://localhost:3669")
    .setExpirationTime("72h")
    .sign(secret);
};

export const verify = async (
  token
) => {
  return jwtVerify(token, secret, { 
    issuer: process.env.APP_ISSUER,
    audience: "http://localhost:3669",
  });
};
