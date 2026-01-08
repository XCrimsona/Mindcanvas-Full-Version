import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    public_id: {
      type: String,
      required: true,
    },
    src_url: {
      type: String,
      required: [true, "https urls only"],
    },
    imageType: {
      type: String,
      enum: ["jpeg", "png", "gif", "svg", "webp", "jpg", "avif"],
      required: [
        true,
        'Formats: "jpeg", "png", "gif", "svg", "webp", "jpg", "avif"',
      ],
    },
    caption: {
      type: String,
      maxlength: [500, "Image caption too long (max 500 characters)"],
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

const imageModel =
  mongoose.model("images", imageSchema);
export default imageModel;

// imageSchema.pre("save", function (next) {
//   if (!this.isModified("owner")) {
//     return next(
//       new Error(
//         "The 'owner' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// imageSchema.pre("save", function (next) {
//   if (!this.isModified("createdBy")) {
//     return next(
//       new Error(
//         "The 'createdBy' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// imageSchema.pre("save", function (next) {
//   if (!this.isModified("workspaceId")) {
//     return next(
//       new Error(
//         "The 'workspaceId' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });
