import jwt from "jsonwebtoken";
// import { getSecret } from "../lib/azure-keyvault";
// import session from "express-session";
// interface TokenPayload {
//   sub: string;
//   role: string;
// }

export class TokenService {
  #jwtsecret = process.env.JWT;
  sign = (payload) => {
    try {
      const key = jwt.sign(payload, this.#jwtsecret, {
        expiresIn: "2h",
      });
      return key;
    } catch (err) {
      throw new Error("Invalid or expired token: ", err.message);
    }
  };

  verify = (token) => {
    try {
      return jwt.verify(token, this.#jwtsecret);
    } catch (err) {
      throw new Error("Could not verify token: ", err.message);
    }
  };

  requireRole = (token, allowedRoles) => {
    const payload = this.verify(token);
    if (!allowedRoles.includes(payload.role)) {
      throw new Error("Access Denied: insufficient privileges");
    }
    return payload;
  };
}
