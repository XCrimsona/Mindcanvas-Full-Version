import getDB from "../../../lib/connnections/Connections.js";
// import audioModel from "../../../models/multi-media/audioModel.js";
// import imageModel from "../../../models/multi-media/imageModel.js";
import UserModel from "../../../models/userModel.js";
// import videoModel from "../../../models/multi-media/videoModel.js";
import canvaspaceModel from "../../../models/CanvaspaceModel.js";
import Router from "express";
import videoModel from "../../../models/multi-media/videoModel.js";
import fs from 'fs';
import path from "path";

//loads all canva data depending on id access
const videoLoader = Router();
videoLoader
    //below code runs when data inside a canva is made after its creation
    .get("/:userid/canvas-management/:canvaid/video/:videoid", async (req, res) => {
        try {
            await getDB();
            const userid = req.user?.sub;
            const canvaid = req.params.canvaid;
            const videoid = req.params.videoid;

            const user = await UserModel.findOne({ _id: userid });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    code: "MISSING_USER_DATA",
                    message: "User data not found",
                });
            } else {
                const canvaspace = await canvaspaceModel.findOne({
                    createdBy: user._id,
                    _id: canvaid,
                });

                if (canvaspace) {
                    const video = await videoModel.findOne({ workspaceId: canvaspace._id, createdBy: user._id, _id: videoid })

                    if (video) {
                        // You point this to your actual folder on your C: drive
                        const videoPath = video.path;
                        const stat = fs.statSync(videoPath);
                        const fileSize = stat.size;
                        const range = req.headers.range;

                        if (range) {
                            // This logic handles the "Scrubbing" (skipping forward in the video)
                            const parts = range.replace(/bytes=/, "").split("-");
                            const start = parseInt(parts[0], 10);
                            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                            const chunksize = (end - start) + 1;
                            const file = fs.createReadStream(videoPath, { start, end });
                            const head = {
                                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                                'Accept-Ranges': 'bytes',
                                'Content-Length': chunksize,
                                'Content-Type': 'video/mp4',
                            };
                            res.writeHead(206, head);
                            file.pipe(res);
                        } else {
                            const head = {
                                'Content-Length': fileSize,
                                'Content-Type': 'video/mp4',
                            };
                            res.writeHead(200, head);
                            fs.createReadStream(videoPath).pipe(res);
                        }

                        //start loading sequence logic to create a blob and send the object to the front so the video may load when requested.
                        // return res.status(200).json({
                        //     success: true,
                        //     message: "Video data retrieved",
                        //     videoData: video,
                        // });
                    } else {
                        return res.status(404).json({
                            success: true,
                            code: "VIDEO_INFO_NOT_FOUND",
                            message:
                                "Video info not found",

                        });
                    }
                } else {
                    return res.status(404).json({
                        success: false,
                        code: "WORKSPACE_DOES_NOT_EXIST",
                        message: "Workspace not found",
                    });
                }
            }
        } catch (err) {
            console.log(err.message);
            return res.status(500).json({
                success: false,
                code: "SERVER_WORKSPACE_ERROR",
                message: "The server side canvaspace has issues",
            });
        }
    })
export default videoLoader;