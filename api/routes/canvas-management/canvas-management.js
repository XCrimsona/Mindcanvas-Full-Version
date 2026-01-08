import getDB from "../../../lib/connnections/Connections.js";
import audioModel from "../../../models/audioModel.js";
import imageModel from "../../../models/imageModel.js";
import textModel from "../../../models/textModel.js";
import UserModel from "../../../models/userModel.js";
import videoModel from "../../../models/videoModel.js";
import workspaceModel from "../../../models/CanvaspaceModel.js";
import Router, { response } from "express";

//loads all canvases 
const canvasManagementRouter = Router();
canvasManagementRouter
    .get("/:userid/canvas-management", async (request, response) => {
        try {
            await getDB();
            const userid = request.params.userid;
            const user = await UserModel.findOne({ _id: userid });
            if (!user) {
                return response.status(404).json({
                    success: false,
                    code: "NO_USER_DATA",
                    status: 404,
                    message: "User not found",
                });
            } else {
                const [workspaces] = await Promise.all([
                    await workspaceModel.find({ createdBy: user._id }),
                ]);

                if (!workspaces) {
                    return response.status(200).json({
                        success: false,
                        status: 200,
                        code: "NO_CANVA_DATA",
                        message: "Create a workspace to begin",
                    });
                }
                else {
                    return response.status(200).json({
                        success: true,
                        code: "RECEIVED_CANVA_DATA",
                        status: 200,
                        data: workspaces,
                    }
                    );
                }
            }
        } catch (err) {
            return response.status(500).json({
                success: false,
                code: "SERVER_CANVA_ERROR",
                status: 500,
                message: "The server side workspace has issues",
            }
            );
        }
    }).post("/:userid/canvas-management", async (request, response) => {
        try {
            await getDB();
            const { sub, workspacename, workspacedescription } = request.body;

            const user = await UserModel.findOne({ _id: String(sub) });
            if (!user) {
                return response.status(404).json({
                    success: false,
                    code: "NO_USER_DATA",
                    status: 404,
                    message: "User not found",
                });
            }

            //to track user signup and dates if needed later on
            const workspaceData = {};
            if (workspacename) workspaceData.workspacename = workspacename;
            if (workspacedescription)
                workspaceData.workspacedescription = workspacedescription;

            if (workspacename && workspacedescription) {
                const refactorWorkspaceName = workspacename
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-");
                const newWorkspace = await workspaceModel.create({
                    name: refactorWorkspaceName,
                    //above for urls
                    workspacename: workspacename,
                    description: workspacedescription,
                    type: "Canvaspace",
                    owner: user._id,
                    size: {
                        height: "800",
                        width: "1400"
                    },
                    collaborators: [],
                    createdBy: user._id,
                    dateCreated: new Date().getTime(),
                });

                if (newWorkspace) {
                    return response.status(201).json(
                        {
                            success: true,
                            code: "CREATED_CANVA",
                            status: 201,
                            message: "New workspace saved",
                        }
                    );
                }
                else {
                    return response.status(400).json(
                        {
                            success: false,
                            code: "MISSING_SUBMISSION_DATA",
                            status: 400,
                            message: "Fill in required fields",
                        }
                    );
                }
            }
        } catch (err) {
            console.log(err.message);

            return response.status(500).json({
                success: false,
                code: "SERVER_CANVA_ERROR",
                status: 500,
                message: err.message,
            }
            );
        }
    }).patch("/:userid/canvas-management",
        async (request, response) => {
            try {
                await getDB();
                const { sub, workspaceid, workspacename, currentworkspacename, description, currentworkspacedescription } = request.body;

                const user = await UserModel.findOne({ _id: sub });
                if (!user) {
                    return response.status(404).json({
                        success: false,
                        code: "NO_USER_DATA",
                        status: 404,
                        message: "User not found",
                    });
                }

                const workspace = await workspaceModel.findOne({
                    _id: workspaceid,
                    createdBy: user._id,
                });

                if (!workspace) {
                    return response.status(404).json({
                        success: false,
                        code: "MISSING_CANVA_DATA",
                        status: 404,
                        message: "Workspace not found",
                    }
                    );
                }

                const updatedPayload = {};
                if (workspacename && currentworkspacename) {
                    if (workspacename !== currentworkspacename) {
                        updatedPayload.workspacename = workspacename;

                        //workspacename with dashes for routing
                        const refactorWorkspaceName = workspacename
                            .toLowerCase()
                            .trim()
                            .replace(/[^a-z0-9\s-]/g, "")
                            .replace(/\s+/g, "-");
                        updatedPayload.name = refactorWorkspaceName;
                    }
                }
                if (description && currentworkspacedescription) {
                    if (description !== currentworkspacedescription) {
                        updatedPayload.description = description;
                    }
                }


                if (updatedPayload.workspacename === workspacename && updatedPayload.description === description) {
                    const updatedWorkspace = await workspaceModel.updateOne(
                        { _id: workspace._id },
                        {
                            $set: updatedPayload,
                        }
                    );
                    if (updatedWorkspace) {
                        return response.status(201).json(
                            {
                                success: true,
                                code: "CANVA_MANAGEMENT_DATA_PATCHED",
                                status: 201,
                                message: "User data component updated",
                            }
                        );
                    } else {
                        return response.status(400).json(
                            {
                                message: "Fill in required fields",
                            }
                        );
                    }
                }
            } catch (err) {
                return response.status(500).json({
                    success: false,
                    code: "SERVER_CANVA_ERROR",
                    status: 500,
                    message: "The server side workspace has issues",
                }
                );
            }
        });


export default canvasManagementRouter;