import mongoose from "mongoose";


const textSchema = new mongoose.Schema(
  {
    //component definitions
    text: {
      type: String,
      minlength: [1, "Text content cannot be empty"],
      maxlength: [10000, "Text content too long (max 10 K characters)"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Text", "List"],
      required: true,
    },
    position: {
      x: {
        type: Number,
        required: [true, "X coordinate is required"],
        min: 0,
      },
      y: {
        type: Number,
        required: [true, "Y coordinate is required"],
        min: 0,
      },
    },
    //user references
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
    // Workspace references
    workspaceId: {
      type: mongoose.Types.ObjectId,
      ref: "workspaces",
      required: true,
    },
    name: {
      type: String,
      ref: "workspaces",
      required: true,
    },
    workspacename: {
      type: String,
      ref: "workspaces",
      required: true,
    },
  },
  { timestamps: true }
);

const textModel = mongoose.model("texts", textSchema);
export default textModel;

// textSchema.pre("save", function (next:any) {
//   if (this.isModified("owner")) {
//     return next(
//       new Error(
//         "The 'owner' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   if (this.isModified("createdBy")) {
//     return next(
//       new Error(
//         "The 'createdBy' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   if (this.isModified("workspaceId")) {
//     return next(
//       new Error(
//         "The 'workspaceId' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });
