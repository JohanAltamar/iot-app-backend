import { Schema, model } from "mongoose";
import { IGroup } from "../interfaces";

const groupSchema = new Schema(
  {
    name:   { type: String, trim: true, required: true, lowercase: true },
    status: { type: Boolean, default: true },
    notes:  { type: String, trim: true },
    admin:  { type: Schema.Types.ObjectId, ref: "User" },
    devicesToken: { type: String, trim: true },
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

export default model<IGroup>("Group", groupSchema);