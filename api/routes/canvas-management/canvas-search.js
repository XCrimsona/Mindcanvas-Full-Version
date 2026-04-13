// routes/workspaceRoutes.js

import express from "express";
import { searchWorkspaces } from "../../../lib/SearchCanvaspaces.js";

const searchRouter = express.Router();

searchRouter.post("/:userid/canvas-management/search", async (req, res) => {
    try {
        const { query, limit = 10 } = req.body;
        //page = 0 left out
        if (typeof query !== "string" ||
            query.trim().length === 0 ||
            query.length > 100) {
            return res.status(400).json({ message: "Invalid query" });
        }

        const data = await searchWorkspaces({
            searchInput: query,
            limit: Number(limit) || 0,
            ownerId: req.user.sub,
        });

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            message: "Search failed",
            error: err.message,
        });
    }
});

export default searchRouter;