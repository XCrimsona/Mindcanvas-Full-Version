import UserModel from "../../../models/userModel.js";
import getDB from "../../../lib/connnections/Connections.js";
import Router from "express";
import { PasswordService } from "../../../lib/PasswordService.js";

const AccountRecoveryRouter = Router();
AccountRecoveryRouter
  .post("/account-recovery", async (req, res) => {
    try {
      await getDB();
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Please fill email field!" });
      }

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "The account email has changed or you are trying to recover an account that does not exist!" });
      }

      if (email && !password) {
        return res.status(200).json({ message: "Provide some more data to complete your account recovery" });
      }

      if (email && password) {
        const passwordService = new PasswordService();
        const currentPassword = await passwordService.hashPassword(
          password
        )

        const newPassword = { password: currentPassword }
        const recoverAccount = await UserModel.updateOne(
          { _id: user._id },
          {
            $set: newPassword,
          },
          {
            new: true,
          }
        );
        if (recoverAccount.modifiedCount === 1) {
          return res.status(201).json(
            {
              success: true,
              code: "ACCOUNT_PASSWORD_UPDATED",
              status: 201,
              message: "Account recovered",
            }
          );
        } else {
          return res.status(500).json(
            {
              success: false,
              code: "ACCOUNT_PASSWORD_UPDATE_FAILED",
              status: 500,
              message: "Account not recovered",
            }
          );
        }
      }
    } catch (err) {
      return res.status(500).json({
        message: err.message || "Unexpected server error",
        status: 500,
      });
    }
  });
export default AccountRecoveryRouter