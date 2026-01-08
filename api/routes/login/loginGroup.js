import UserModel from "../../../models/userModel.js";
import getDB from "../../../lib/connnections/Connections.js";
import AuthService from "../../../lib/Auth.js";
// import express from "express";
import Router from "express";
import { TokenService } from "../../../lib/JwtTokenService.js";
import { PasswordService } from "../../../lib/Hashing.js";

const loginRouter = Router();
loginRouter
  .get("/", async (req, res) => {
    try {
      await getDB();
      return res.status(200).json({ status: 200 });
    } catch (err) {
      return res.status(500).json({
        error: err.message || "Unexpected connection error",
        status: 500,
      });
    }
  })
  .post("/", async (req, res) => {
    try {
      await getDB();
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });

      if (!email || !password) {
        return res.status(400).json({ error: "Please fill required fields!", status: 400 });
      }

      if (!user) {
        return res.status(404).json({ error: "Enter email doesn't exist!", status: 404 });
      }

      const passwordService = new PasswordService();
      const currentPassword = await passwordService.comparePasswords(
        password,
        user.password
      )
      if (
        !currentPassword
      ) {
        throw new Error("Incorrect Credentials");
      }
      const payload = {
        sub: user._id,
        role: user.role,
      };

      const tknservice = new TokenService();
      const signedToken = tknservice.sign(payload);
      res.cookie(`authtoken${user._id}`, signedToken, {
        secure: process.env.SECURE,
        httpOnly: true,
        sameSite: "lax",
        maxAge: 2 * 60 * 60 * 1000,
      })
      return res.status(200).json({ code: "AUTHENTICATED", user: user._id, message: "User is authenticated" });
      //end
    } catch (err) {
      return res.status(500).json({
        error: err.message || "Unexpected server error",
        status: 500,
      });
    }
  });
export default loginRouter