// Session schema (optional but recommended for tracking devices)
import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tokenId: { type: String, required: true }, // unique per device
    device: { type: String, default: "unknown" }, // e.g., "laptop", "phone"
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
});

export default mongoose.model("Session", SessionSchema);
