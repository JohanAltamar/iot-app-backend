import { Document } from "mongoose";
export interface ITokenPayload {
  uid: string;
}

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  sessionTokens: Array<string>;
  deviceTokens: string;
  group: string;
  role: string;
  status: boolean;
}
