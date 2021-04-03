import { Schema, model } from "mongoose";
import { IUser } from "../interfaces";

const userSchema = new Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    name:  { type: String, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    sessionTokens: { type: Array, of: String, default: [] },
    deviceTokens:  { type: String, default: "" },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    role: {
      type: String,
      enum: ["ADMIN_ROLE", "USER_ROLE", "SUPER_ADMIN_ROLE"],
      default: "USER_ROLE",
    },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const { _id, __v, sessionTokens, password, ...rest } = ret;
        rest.uid = _id;
        return rest;
      },
    },
  }
);

export default model<IUser>("User", userSchema);
