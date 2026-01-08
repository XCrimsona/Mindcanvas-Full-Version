import mongoose from "mongoose";

const audioSchema = new mongoose.Schema(
  {
    audioSrc: {
      type: String,
      required: true,
    },
    audioFormat: {
      type: String,
      enum: ["mp3", "wav", "ogg"],
      default: "mp3",
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

const audioModel = mongoose.model("audios", audioSchema);
export default audioModel;

// audioSchema.pre("save", function (next) {
//   if (!this.isModified("owner")) {
//     return next(
//       new Error(
//         "The 'owner' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// audioSchema.pre("save", function (next) {
//   if (!this.isModified("createdBy")) {
//     return next(
//       new Error(
//         "The 'createdBy' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// audioSchema.pre("save", function (next) {
//   if (!this.isModified("workspaceId")) {
//     return next(
//       new Error(
//         "The 'workspaceId' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });
