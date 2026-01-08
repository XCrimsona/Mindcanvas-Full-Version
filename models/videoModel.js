import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoSrc: {
      type: String,
      required: true,
    },
    videoFormat: {
      type: String,
      enum: ["mp4", "webm", "mov"],
      required: true,
    },
    thumbnail: {
      type: String,
      maxlength: [2048, "Thumbnail URL too long (max 2048 characters)"],
    },
    owner: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    workspaceId: {
      type: mongoose.Types.ObjectId,
      ref: "workspaces",
      required: true,
    },
  },
  { timestamps: true }
);

const videoModel =
  mongoose.model("videos", videoSchema);
export default videoModel;

// videoSchema.pre("save", function (next) {
//   if (!this.isModified("owner")) {
//     return next(
//       new Error(
//         "The 'owner' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// videoSchema.pre("save", function (next) {
//   if (!this.isModified("createdBy")) {
//     return next(
//       new Error(
//         "The 'createdBy' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// videoSchema.pre("save", function (next) {
//   if (!this.isModified("workspaceId")) {
//     return next(
//       new Error(
//         "The 'workspaceId' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });
