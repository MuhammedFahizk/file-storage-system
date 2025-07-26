import { model, Schema } from "mongoose";

const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['image', 'video', 'pdf'],
    required: true
  },
  size: {
    type: Number
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Folder', 
    default: null
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  isTrashed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const File = model("File", FileSchema);
