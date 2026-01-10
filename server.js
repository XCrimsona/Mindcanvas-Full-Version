import dotenv from "dotenv"
dotenv.config();
const port = process.env.PORT;

import express from "express";
import registerRouter from "./api/routes/register/registerGroup.js";
import loginRouter from "./api/routes/login/loginGroup.js";
import accountRouter from "./api/routes/account-info/account-info.js";
import canvasManagementRouter from "./api/routes/canvas-management/canvas-management.js";
import singleDynamiCanvaDataGroupRouter from "./api/routes/canvas-management/single-dynamic-canva-data-group.js";
import cors from "cors"
import AuthService from "./lib/Auth.js";
import cookieParser from "cookie-parser";
import signOut from "./api/routes/signout-route/signout-group.js";
import AccountRecoveryRouter from "./api/routes/account-recovery/AccountRecoveryGroup.js";
const app = express();

try {

    //allow frontend communication
    app.use(cookieParser());
    app.use(cors({
        origin: "http://localhost:5176",//the frontend port location
        credentials: true//allow cookies to be sent
    }));

    //enable submissions
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //routes no auth
    app.use("/api/signup-portal", registerRouter);
    app.use("/api/signin-portal", loginRouter);
    app.use("/api/signin-portal", AccountRecoveryRouter);

    //routes auth required
    app.get("/api/auth-check", AuthService.isAuthenticated, (req, res) => {
        res.status(200).json({
            code: "AUTHENTICATED",
            userid: req.user.sub,
            role: req.user.role,
        });
    });

    app.use("/api/account", AuthService.isAuthenticated, accountRouter);
    app.use("/api/account", AuthService.isAuthenticated, canvasManagementRouter);
    app.use("/api/account", AuthService.isAuthenticated, singleDynamiCanvaDataGroupRouter);
    app.use("/api/account", AuthService.isAuthenticated, signOut);

    app.listen(port, () => console.log(`http://localhost:${port}`));
}
catch (err) {
    console.warn("server anomaly message: ", err.message);
    console.warn("server anomaly stack: ", err.stack);
}