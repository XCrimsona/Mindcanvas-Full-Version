import getDB from "../../../lib/connnections/Connections.js";
import audioModel from "../../../models/audioModel.js";
import imageModel from "../../../models/imageModel.js";
import textModel from "../../../models/textModel.js";
import UserModel from "../../../models/userModel.js";
import videoModel from "../../../models/videoModel.js";
import canvaspaceModel from "../../../models/CanvaspaceModel.js";
import Router from "express";


//loads all canva data depending on id access
const singleDynamicCanvaDataGroupRouter = Router();
singleDynamicCanvaDataGroupRouter
    //below code runs when data inside a canva is made after its creation
    .get("/:userid/canvas-management/:canvaid", async (req, response) => {

        try {
            await getDB();
            const userid = req.user?.sub;
            const canvaid = req.params.canvaid;
            // console.log(userid);

            const user = await UserModel.findOne({ _id: userid });
            // console.log(user);

            if (!user) {
                return response.status(404).json({
                    success: false,
                    code: "MISSING_USER_DATA",
                    status: 404,
                    message: "User data not found",
                });
            } else {
                const canvaspace = await canvaspaceModel.findOne({
                    createdBy: user._id,
                    _id: canvaid,
                });
                // console.log("canvaspace: ", canvaspace);

                if (canvaspace) {
                    const [texts
                        // , audios, images, videos
                    ] = await Promise.all([
                        textModel.find({ workspaceId: canvaspace._id, createdBy: user._id }),
                        // audioModel.find({ workspaceId: canvaspace._id, createdBy: user._id }),
                        // imageModel.find({ workspaceId: canvaspace._id, createdBy: user._id }),
                        // videoModel.find({ workspaceId: canvaspace._id, createdBy: user._id }),
                    ]);

                    const workspaceData = {
                        texts,
                        // audios,
                        // images,
                        // videos,
                    };

                    const empty =
                        texts.length === 0;
                    // &&
                    // audios.length === 0 &&
                    // images.length === 0 &&
                    // videos.length === 0;

                    //update to canvaInfo
                    const workspaceNameData = {
                        workspaceName: canvaspace.name,
                        workspaceTextName: canvaspace.workspacename,
                        canvaspace,
                        workspaceData,
                    };
                    if (empty) {
                        return response.status(200).json({
                            success: true,
                            status: 200,
                            code: "NO_EXISTING_DATA",
                            message:
                                "Your canva doesn't have data yet. Create some data using the Component Hub. ",
                            workspaceNameData
                        });
                    } else {
                        return response.status(200).json({
                            success: true,
                            status: 200,
                            message: "Data retrieval complete.",
                            workspaceNameData,
                        });
                    }
                } else {
                    return response.status(404).json({
                        success: false,
                        code: "WORKSPACE_DOES_NOT_EXIST",
                        status: 404,
                        message: "Workspace not found",
                    });
                }
            }
        } catch (err) {
            return response.status(500).json({
                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side canvaspace has issues",
            });
        }
    })
    .post("/:userid/canvas-management/:canvaid", async (req, response) => {
        // { params }
        try {
            await getDB();
            const userid = req.user?.sub;;
            const canvaid = req.params.canvaid;
            if (!userid || !canvaid) {
                return response.status(401).json({
                    success: false,
                    code: "NOT_AUTHORIZED",
                    status: 401,
                    message: "User not logged in",
                });
            } else {
                const user = await UserModel.findById(String(userid));
                if (!user) {
                    return response.status(401).json({
                        success: false,
                        code: "USER_NOT_AUTHORIZED",
                        status: 401,
                        message: "User is not logged in",
                    });
                } else {
                    const canvaspace = await canvaspaceModel.findOne({
                        createdBy: user._id,
                        _id: canvaid,
                    });

                    if (canvaspace) {
                        const { text, type, x, y
                        } = req.body;
                        if (text && type && x >= 0 && y >= 0) {

                            const createTextComponent = await textModel.create({
                                text: text,
                                type: type,
                                position: { x: x, y: y },
                                owner: user._id,
                                createdBy: user._id,
                                workspaceId: canvaid,
                                //the url name of the canva canvaspace
                                name: canvaspace.name,
                                workspacename: canvaspace.workspacename,
                            });
                            // console.log("createTextComponent: ", createTextComponent);

                            if (!createTextComponent) {
                                return response.status(500).json({
                                    success: true,
                                    code: "COMPONENT_CREATION_FAILED",
                                    status: 500,
                                    message: "Not Created",
                                });
                            } else {
                                return response.status(201).json({
                                    success: true,
                                    code: "COMPONENT_CREATED",
                                    status: 201,
                                    message: "TextComponent created!",
                                });
                            }
                        } else {
                            return response.status(400).json({
                                success: false,
                                code: "MISSING_ESSENTIAL_COMPONENT_DATA",
                                status: 400,
                                message: "Request requires more data!",
                            });
                        }
                    } else {
                        return response.status(404).json({
                            success: false,
                            code: "REQUESTED_WORKSPACE_NOT_FOUND",
                            status: 404,
                            message: "Requested canvaspace not found!",
                        });
                    }
                }
            }
        } catch (err) {
            console.log("err: ", err.message);

            return response.status(500).json({

                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: err.message,
            });
        }
    })
    .patch("/:userid/canvas-management/:canvaid", async (req, res) => {
        try {
            await getDB();
            const sub = req.user?.sub;
            const canvaid = req.params.canvaid;

            //id can be passed as the layout/fragment id store in the db 
            //communication at each invocation must be explained or future updates could regress development
            const { _id, type, updateType, text, x, y, newHeight, newWidth } = req.body;
            //text  will be null for xy updates 
            //text will be present for text updates
            console.log(newHeight, newWidth);


            if (sub && canvaid) {
                const user = await UserModel.findById(String(sub));
                if (user) {
                    const canvaspace = await canvaspaceModel.findOne({
                        createdBy: user._id,
                        _id: canvaid,
                    });
                    // console.log("canvaspace: ", canvaspace);
                    if (canvaspace) {
                        // console.log("_id and type: ", _id, type, updateType);

                        if (!type || !updateType) {
                            return res.status(400).json({
                                success: false,
                                code: "INSUFFICIENT_DATA",
                                status: 400,
                                message: "type or updateType argument is missing a value",
                            });
                        } else {
                            // console.log("type: ", type);

                            if (type === "Text") {
                                if (updateType === "Text") {

                                    if (!_id) {
                                        return res.status(400).json({
                                            success: false,
                                            code: "INSUFFICIENT_DATA",
                                            status: 400,
                                            message: "Component id is missing",
                                        });
                                    }

                                    //create checkpoint to ensure field
                                    const newData = {};
                                    if (text) newData.text = text;

                                    if (newData) {
                                        const reqToEditTextComponent = await textModel.updateOne(
                                            {
                                                _id,
                                                type,
                                                createdBy: user._id,
                                            },
                                            { $set: newData },
                                            { new: true }
                                        );
                                        req.save

                                        if (reqToEditTextComponent) {
                                            return res.status(200).json({
                                                success: true,
                                                code: "TEXT_UPDATE_REQUEST_COMPLETE",
                                                status: 200,
                                                message: "Requested text component has been updated",
                                            });

                                        } else {
                                            return res.status(400).json({
                                                success: false,
                                                code: "TEXT_UPDATE_FAILED",
                                                status: 404,
                                                message: "Could not update text component data",
                                            });
                                        }
                                    } else {
                                        return res.status(400).json({
                                            success: false,
                                            code: "TEXT_FIELD_NULL",
                                            status: 404,
                                            message: "Requested text component data is not available",
                                        });
                                    }
                                }
                                if (updateType === "XY_POSITIONS") {
                                    const positions = {
                                        position: {
                                            x: x,
                                            y: y
                                        }
                                    };

                                    const reqToUpdateMediaFragmentXYCordinates = await textModel.updateOne(
                                        {
                                            _id: _id,
                                            createdBy: user._id,
                                        },
                                        { $set: positions },
                                        { new: true }
                                    );

                                    if (reqToUpdateMediaFragmentXYCordinates) {
                                        return res.status(200).json({
                                            success: true,
                                            code: "MEDIA_XY_COORDINATES_REQUEST_UPDATED",
                                            status: 200,
                                            message: "Text XY coordinates have been updated",
                                        });

                                    } else {
                                        return res.status(404).json({
                                            success: false,
                                            code: "TEXT_UPDATE_REQUESTED_FAILED",
                                            status: 404,
                                            message: "Requested text component data is not available",
                                        });
                                    }
                                }
                            }

                            if (type === "Canvaspace") {
                                console.log("type: ", type);

                                if (updateType === "size") {
                                    console.log("updateType: ", updateType);
                                    console.log("height: ", newHeight);
                                    console.log("width: ", newWidth);

                                    //create checkpoint to ensure field
                                    if (!newHeight && !newWidth) {
                                        return res.status(400).json({
                                            success: false,
                                            code: "INSUFFICIENT_CANVAS_SIZE_DATA",
                                            status: 400,
                                            message: "Not enough update canvas size",
                                        });
                                    }

                                    let size;
                                    if (newHeight) {
                                        size = {
                                            size: {
                                                height: newHeight,
                                            }
                                        }
                                    }
                                    if (newWidth) {
                                        size = {
                                            size: {
                                                width: newWidth
                                            }
                                        }
                                    }
                                    if (newHeight && newWidth) {
                                        size = {
                                            size: {
                                                height: newHeight,
                                                width: newWidth
                                            }
                                        }
                                    }


                                    if (Object.keys(size).length === 0) {
                                        return res.status(400).json({
                                            success: false,
                                            code: "INSUFFICIENT_CANVAS_DATA",
                                            status: 400,
                                            message: "Updating canvas argument is blank",
                                        });
                                    }
                                    console.log("size: ", size);

                                    if (size) {
                                        console.log("user:", user);
                                        console.log(canvaspace.size);

                                        const reqToResizeCanvas = await canvaspaceModel.updateOne(
                                            {
                                                _id: canvaspace._id,
                                                createdBy: user._id,
                                                type: type,
                                            },
                                            { $set: size },
                                            {
                                                new: true,
                                                // runValidators: true
                                            }
                                            // { new: true }
                                            // { runValidators: true }
                                        );
                                        console.log(reqToResizeCanvas);

                                        if (reqToResizeCanvas.modifiedCount === 1) {
                                            console.log(reqToResizeCanvas);
                                            return res.status(200).json({
                                                success: true,
                                                code: "CANVASPACE_UPDATED",
                                                status: 200,
                                                message: "Canvaspace size changed",
                                            });

                                        } else {
                                            console.log(reqToResizeCanvas);
                                            return res.status(400).json({
                                                success: false,
                                                code: "CANVASPACE_NOT_UPDATED",
                                                status: 404,
                                                message: `Canvaspace size NOT changed`,
                                            });
                                        }
                                    } else {
                                        return res.status(400).json({
                                            success: false,
                                            code: "TEXT_FIELD_NULL",
                                            status: 404,
                                            message: "Requested text component data is not available",
                                        });
                                    }
                                }
                            }
                        }
                    } else {
                        return res.status(404).json({
                            success: false,
                            code: "REQUESTED_WORKSPACE_NOT_FOUND",
                            status: 404,
                            message: "Requested canva not found",
                        });
                    }
                } else {
                    return res.status(404).json({
                        success: false,
                        code: "USER_NOT_FOUND",
                        status: 404,
                        message: "User is not authorized",
                    });
                }

            } else {
                return res.status(401).json({
                    success: false,
                    code: "NOT_AUTHORIZED",
                    status: 401,
                    message: "User not logged in",
                });

            }
        } catch (err) {
            console.log("main patch endpoint single dynamic canva data group has an issue: ", err.message);

            return res.status(500).json({
                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side canvaspace has issues",
            });
        }
    })

    .delete("/:userid/canvas-management/:canvaid", async (req, res) => {
        try {
            await getDB();
            const sub = req.user?.sub;
            const canvaid = req.params.canvaid;
            const { type, _id } = req.body;

            if (sub && canvaid) {
                const user = await UserModel.findById(String(sub));
                if (!user) {
                    return res.status(404).json({

                        success: false,
                        code: "USER_NOT_FOUND",
                        status: 404,
                        message: "User is not authorized",
                    });
                }

                const canvaspace = await canvaspaceModel.findOne({
                    createdBy: user._id,
                    _id: canvaid,
                });
                if (!canvaspace) {
                    return res.status(404).json({
                        success: false,
                        code: "REQUESTED_WORKSPACE_NOT_FOUND",
                        status: 404,
                        message: "Requested canvaspace not found",
                    });
                }

                if (!type) {
                    return res.status(400).json({
                        success: false,
                        code: "INSUFFICIENT_DATA",
                        status: 400,
                        message: "Insufficient data",
                        status: 400,
                    });
                }

                if (type === "Text") {
                    if (!_id) {
                        return res.status(400).json({
                            success: false,
                            code: "INSUFFICIENT_COMPONENT_DATA",
                            status: 400,
                            message: "Insufficient component data",
                        });
                    } else {
                        const reqToDeleteTextComponent = await textModel.deleteOne({
                            //component's id
                            _id,
                            createdBy: user._id,
                        });

                        if (!reqToDeleteTextComponent) {
                            return res.status(404).json({
                                success: false,
                                code: "TEXT_UPDATE_REQUESTED_FAILED",
                                status: 404,
                                message: "Requested text component data not available",
                            });
                        } else {
                            return res.status(200).json({

                                success: true,
                                code: "TEXT_UPDATE_REQUEST_COMPLETE",
                                status: 200,
                                message: "Requested text has been updated",
                            })
                        }
                    }
                }

                if (type === "Canvaspace") {
                    // console.log("_id: ", _id, " ", "id: ", id);

                    // console.log("canvaspace within type logic");

                    const reqToDeleteTextComponents =
                        await textModel.deleteMany({
                            //component's id
                            //user data
                            // owner: user._id,
                            workspaceId: canvaspace._id,
                            createdBy: user._id,
                        });

                    if (reqToDeleteTextComponents.acknowledged) {
                        const reqToDeleteTextComponent = await canvaspaceModel.deleteOne({
                            //component's id
                            _id: canvaid,
                            //user data
                            owner: user._id,
                            createdBy: user._id,
                        });
                        if (reqToDeleteTextComponent) {

                            return res.status(200).json({
                                success: true,
                                code: "WORKSPACE_DELETED",
                                status: 200,
                                message: "Workspace has been deleted",
                            });
                        } else {
                            return res.status(404).json({
                                success: false,
                                code: "WORKSPACE_DELETION_FAILED",
                                status: 404,
                                message: "Failed to delete the requested canvaspace",
                            });
                        }
                    } else {
                        return res.status(404).json({
                            success: false,
                            code: "WORKSPACE_DATA_DELETION_FAILED",
                            status: 404,
                            message: "Failed to delete the requested canvaspace's data",
                        });
                    }
                }
            } else {
                return res.status(401).json({
                    success: false,
                    code: "NOT_AUTHORIZED",
                    status: 401,
                    message: "User not logged in",
                })
            }
        } catch (err) {
            console.log("main delete endpoint single dynamic canva data group has an issue: ", err.message);

            return res.status(500).json({
                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                status: 500,
                message: "The server side canvaspace has issues",
            })
        }
    });
export default singleDynamicCanvaDataGroupRouter;