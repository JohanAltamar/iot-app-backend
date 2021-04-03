import { Schema, model } from "mongoose";
import { IDevice } from '../interfaces';

const deviceSchema = new Schema(
  {
    name:   { type: String, trim: true, required: true, lowercase: true },
    status: { type: Boolean, default: true },
    icon:   { type: String, trim: true },
    room:   { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user:   { type: Schema.Types.ObjectId, ref: "User" },
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

export default model<IDevice>("Device", deviceSchema);
