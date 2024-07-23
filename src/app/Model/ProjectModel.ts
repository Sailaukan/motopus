import mongoose, { Document, Model } from "mongoose";

export interface IVideoCommand {
  prompt: string;
  generatedCode: string;
  createdAt: Date;
}

export interface IUser {
  userId: string;
  videoCommands: IVideoCommand[];
}

export interface IUserDocument extends IUser, Document {
  updatedAt: Date;
}

const videoCommandSchema = new mongoose.Schema<IVideoCommand>({
  prompt: {
    type: String,
    required: true,
  },
  generatedCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    videoCommands: [videoCommandSchema],
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserDocument> =
  mongoose.models?.User || mongoose.model("User", userSchema);

export default User;