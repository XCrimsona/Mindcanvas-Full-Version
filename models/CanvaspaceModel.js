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

workspaceSchema.pre("save", function (next) {
  if (this.name) this.nameLower = this.name.toLowerCase();
  if (this.workspacename) this.workspacenameLower = this.workspacename.toLowerCase();
  if (this.description) this.descriptionLower = this.description.toLowerCase();
  next();
});

workspaceSchema.index({ name: "text", workspacename: "text", description: "text" })
workspaceSchema.index({ nameLower: 1 })
workspaceSchema.index({ owner: 1 })
workspaceSchema.index({ workspacenameLower: 1 })
workspaceSchema.index({ descriptionLower: 1 })
