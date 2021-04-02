import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    sessionTokens: { type: Array, of: String, default: [] },
    deviceTokens: { type: String, default: "" },
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
        rest.id = _id;
        return rest;
      },
    },
  }
);

const User = model("User", userSchema);

export default User;
