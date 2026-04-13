import getDB from "../../../lib/connnections/Connections.js";
// import audioModel from "../../../models/multi-media/audioModel.js";
// import imageModel from "../../../models/multi-media/imageModel.js";
import UserModel from "../../../models/userModel.js";
// import videoModel from "../../../models/multi-media/videoModel.js";
import canvaspaceModel from "../../../models/CanvaspaceModel.js";
import Router from "express";
import imageModel from "../../../models/multi-media/imageModel.js";
import fs from 'fs';
import path from "path";

//loads all canva data depending on id access
const imageLoader = Router();
// imageLoader.js - Optimized for High-Frequency Cluster Calls
imageLoader.get("/:userid/canvas-management/:canvaid/images/:imageid", async (req, res) => {
    try {
        await getDB();
        const { canvaid, imageid } = req.params;
        const userid = req.user?.sub;

        // Find the specific document where the imageid exists in the array
        const parentDoc = await imageModel.findOne({
            workspaceId: canvaid,
            createdBy: userid,
            "imagecluster._id": imageid // Mongo reaches into the array automatically
        });

        if (!parentDoc) {
            console.error("Parent Doc not found for image:", imageid);
            return res.status(404).json({ success: false, message: "Cluster not found" });
        }

        // Now extract the specific object from the array to get the imagepath
        const targetImage = parentDoc.imagecluster.find(img => img._id.toString() === imageid);

        if (!targetImage || !targetImage.imagepath) {
            return res.status(404).json({ success: false, message: "Image path entry missing" });
        }

        const absolutePath = targetImage.imagepath;

        if (!fs.existsSync(absolutePath)) {
            console.error("File not found on disk:", absolutePath);
            return res.status(404).json({ success: false, message: "File missing on C: drive" });
        }

        // Stream the binary file
        res.writeHead(200, {
            'Content-Type': targetImage.mime || 'image/png',
            'Content-Length': fs.statSync(absolutePath).size,
            'Cache-Control': 'public, max-age=86400'
        });

        fs.createReadStream(absolutePath).pipe(res);

    } catch (err) {
        console.error("Stream Error:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});
export default imageLoader;