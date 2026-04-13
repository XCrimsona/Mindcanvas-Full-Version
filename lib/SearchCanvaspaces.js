import canvaspaceModel from "../models/CanvaspaceModel.js";

export const searchWorkspaces = async ({ searchInput, limit, ownerId }) => {
    await getDB();

    const search = searchInput.toLowerCase();

    const queries = [
        canvaspaceModel.find({
            owner: ownerId,
            $or: [
                { nameLower: { $regex: search, $options: "i" } },
                { workspacenameLower: { $regex: search, $options: "i" } },
                { descriptionLower: { $regex: search, $options: "i" } },
                { $text: { $search: search } },
            ],
        }).limit(limit || 0),

        TextModel.find({
            owner: ownerId,
            $text: { $search: search },
        }).limit(limit || 0),

        ImageModel.find({
            owner: ownerId,
            caption: { $regex: search, $options: "i" },
        }).limit(limit || 0),

        VideoModel.find({
            owner: ownerId,
            thumbnail: { $regex: search, $options: "i" },
        }).limit(limit || 0),
    ];

    const [canvasResults, textResults, imageResults, videoResults] =
        await Promise.all(queries);

    // Merge into a single array
    return [...canvasResults, ...textResults, ...imageResults, ...videoResults];
};