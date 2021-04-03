import { Schema, model } from "mongoose";
import { IRoom } from "../interfaces";

const roomSchema = new Schema(
  {
    name:   { type: String, trim: true, required: true, lowercase: true },
    status: { type: Boolean, default: true },
    icon:   { type: String, trim: true },
    group:  { type: Schema.Types.ObjectId, ref: "Group", required: true },
    allowedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const { _id, __v, ...rest } = ret;
        rest.id = _id;

        return rest;
      },
    },
  }
);

export default model<IRoom>("Room", roomSchema);
