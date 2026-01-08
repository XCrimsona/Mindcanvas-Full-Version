import UserModel from "../../../models/userModel.js";
import getDB from "../../../lib/connnections/Connections.js";
import AuthService from "../../../lib/Auth.js";
import { Router } from "express";
const registrationRouter = Router();

registrationRouter.get("/", async (req, res) => {

  try {
    console.log("get register route");

    await getDB();
    return res.json({ status: 200 });
  } catch (err) {
    return res.json(
      { error: err.message || "Unexpected connection error" },
      { status: 500 }
    );
  }
})
  .post("/", async (req, res) => {
    try {
      console.log("post register route");

      await getDB();
      // const body = await request.json();
      const { firstname, lastname, gender, dob, email, password } = req.body;
      // console.log(firstname, lastname, gender, dob, email, password);

      const user = await UserModel.findOne({ email });

      if (!email || !password) {
        return res.status(400).json(
          { message: "Please fill required fields!", status: 400 }
        );
      }
      if (user) {
        return res.status(409).json({ message: "Account Name Already Exists", status: 409 })
      }
      else {

        // return res.json(
        //   { error: "Enter email doesn't exist!", status: 404 }
        // );
        //sign user and redirect
        const data = {};
        if (firstname) data.firstname = firstname;
        if (lastname) data.lastname = lastname;
        if (gender) data.gender = gender;
        if (dob) data.dob = dob;
        if (email) data.email = email;
        if (password) {
          data.password = password;
        }

        const authService = new AuthService();
        await authService.signup(data);
        // console.log("formattedUserData : ", formattedUserData);

        // const returnData = {
        //   _id: user._id,
        //   data: authResponse,
        // };
        // console.log("return data from register group: ", returnData.data);

        return res.status(200).json({ message: "Account created", status: 200 });
      }
    } catch (err) {
      return res.status(500).json(
        { error: err.message || "Unexpected server error" },
        { status: 500 }
      );
    }
  })

export default registrationRouter
