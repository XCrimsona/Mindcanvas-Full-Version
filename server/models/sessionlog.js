import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
  sessionId: String,
});
