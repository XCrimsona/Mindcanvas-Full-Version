import getDB from "../../../lib/connnections/Connections.js";
import audioModel from "../../../models/audioModel.js";
import imageModel from "../../../models/imageModel.js";
import textModel from "../../../models/textModel.js";
import UserModel from "../../../models/userModel.js";
import videoModel from "../../../models/videoModel.js";
import workspaceModel from "../../../models/CanvaspaceModel.js";
import Router from "express";


//loads all canva data depending on id access
const signOut = Router();
signOut
    .post("/:userid/logout", async (req, response) => {
        try {
            const userid = req.user?.sub;
            if (!userid) {
                response.json({
                    success: false,
                    code: "NOT_AUTHORIZED",
                    status: 401,
                    message: "User not logged in",
                });
            } else {
                const user = await UserModel.findById(String(userid));
                if (!user) {
                    response.json({
                        success: false,
                        code: "USER_NOT_AUTHORIZED",
                        status: 401,
                        message: "User is not logged in",
                    });
                }
                else {
                    const userid = req.headers["x-active-user"];
                    const foundCookie = req.cookies?.[`authtoken${userid}`];
                    if (foundCookie) {
                        response.clearCookie(`authtoken${user._id}`, {
                            secure: process.env.SECURE,
                            httpOnly: true,
                            sameSite: "lax",
                            maxAge: 2 * 60 * 60 * 1000,
                        })
                        response.json({
                            success: true,
                            code: "USER_LOGOUT_SUCCESS",
                            status: 200,
                            message: "User logged out successfully",
                        });
                    }

                    else {
                        response.json({
                            success: false,
                            code: "REQUESTED_COOKIE_NOT_FOUND",
                            status: 404,
                            message: "Requested cookie not found!",
                        });
                    }
                }
            }
        } catch (err) {
            console.log("err: ", err.message);

            response.status(500).json({

                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side workspace has issues",
            });
        }
    });
export default signOut;