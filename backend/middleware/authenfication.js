import { verify } from "../utils/auth/jwt";

export async function auth(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  if (token == undefined || token == null)
    return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = await verify(token);
    req.body.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}
