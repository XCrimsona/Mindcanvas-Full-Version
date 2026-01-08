import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    // Workspace definitions
    name: {
      type: String,
      required: true,
      minlength: [3, "Workspace name must be at least 3 characters"],
      maxlength: [100, "Workspace name too long"],
    },
    workspacename: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Workspace name must be at least 3 characters"],
      maxlength: [100, "Workspace name too long"],
    },
    description: {
      type: String,
      maxlength: [300, "Description is too long"],
    },
    type: {
      type: String,
      enum: ["Canvaspace"],
      required: true,
    },
    size: {
      height: {
        type: String,
        minlength: 3,
        maxlength: 5
      },
      width: {
        type: String,
        minlength: 3,
        maxlength: 5
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
    dateCreated: {
      type: String,
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const canvaspaceModel = mongoose.model("workspaces", workspaceSchema);
export default canvaspaceModel;

// OPTIONAL FEATURE for sharing workspaces
// isPublic: {
//     type: Boolean,
//     default: false
//   }

// workspaceSchema.pre("save", function (next) {
//   if (!this.isModified("owner")) {
//     return next(
//       new Error(
//         "The 'owner' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// workspaceSchema.pre("save", function (next) {
//   if (!this.isModified("createdBy")) {
//     return next(
//       new Error(
//         "The 'createdBy' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });

// workspaceSchema.pre("save", function (next) {
//   if (!this.isModified("dateCreated")) {
//     return next(
//       new Error(
//         "The 'createdBy' field data is immutable and cannot be changed once set."
//       )
//     );
//   }
//   next();
// });
