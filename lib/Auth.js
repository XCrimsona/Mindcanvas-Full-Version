import { PasswordService } from "./Hashing.js";
import UserModel from "../models/userModel.js";
import { TokenService } from "./JwtTokenService.js";
import jwt from "jsonwebtoken"
// import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import session from "express-session";

// interface IRegister {
//   firstname: string;
//   lastname: string;
//   gender?: string | null;
//   dob?: string | null;
//   email: string;
//   password: string;
// }
// interface ILogin {
//   email: string;
//   password: string;
// }

// interface ISignUpResults {
//   success: boolean;
//   message: string;
// }
class AuthService {
  constructor() {
    this.passwordService = new PasswordService();
  }

  signup = async (userInput) => {
    const { firstname, lastname, gender, dob, email, password } = userInput;

    if (!firstname || !lastname || !email || !password) {
      return { success: false, message: "Required form fields are missing" };
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return { success: false, message: "That email already exists!" };
    }
    else {

      const hashpassword = await this.passwordService.hashPassword(password);

      const data = {
        firstname,
        lastname,
        email,
        dob,
        password: hashpassword,
        role: "user",
      };
      if (gender) data.gender = gender;
      if (dob) data.dob = dob;

      const newUserData = await UserModel.create(data);

      if (newUserData._id) {
        console.log("data created account");
      }
    }
  };

  signin = async (userInput) => {
    const { email, password } = userInput;
    const user = await UserModel.findOne({ email });

    if (!user) throw new Error("That email does not exist!");

    const currentPassword = await this.passwordService.comparePasswords(
      password,
      user.password
    )
    if (
      // console.log("User id: ", user._id, " user role:", user.role);
      currentPassword

    ) {
      const validatedUser = {
        sub: user._id,
        role: user.role,
      };

      const tknservice = new TokenService();
      // const signedToken = ;

      // express session to save session in db without cookies in frontend
      return tknservice.sign(validatedUser);
    } else {
      throw new Error("Incorrect Credentials");
    }
  };


  static isAuthenticated = (req, res, next) => {
    const userid = req.headers["x-active-user"];
    const token = req.cookies?.[`authtoken${userid}`];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not Authenticated",
        code: "UNAUTHENTICATED",
      })
    }
    else {
      try {
        jwt.verify(token, process.env.JWT, (err, decoded) => {
          if (err) {
            return res.status(401).json({
              success: false,
              message: "Invalid token",
              code: "UNAUTHORIZED",
            })
          }
          else {
            req.user = decoded;
            next();
          }
        })
      } catch (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
          code: "UNAUTHORIZED",
        })
      }
    }
  }
}

export default AuthService
