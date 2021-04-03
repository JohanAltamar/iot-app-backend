import { Document } from "mongoose";

export interface IDeviceTokenPayload {
  uid: string;
  group: string;
}
export interface ITokenPayload {
  uid: string;
}

export interface IUser extends Document {
  email:  string;
  name:   string;
  group:  IGroup["_id"];
  role:   string;
  status: boolean;
  password: string;
  sessionTokens: Array<string>;
}

export interface IGroup extends Document {
  name:   string;
  admin:  IUser["_id"];
  status: boolean;
  notes:  string;
  devicesToken: string;
}