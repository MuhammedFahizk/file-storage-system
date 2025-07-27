import { model, Schema } from "mongoose";

const FolderSchema = new Schema(
  {
    name: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    isStarred: {
      type: Boolean,
    },
    isTrashed: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const Folder = model("Folder", FolderSchema);
