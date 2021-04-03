import jwt from "jsonwebtoken";

import env from "../env.config";
import { ITokenPayload } from "../interfaces";
import { User } from "../models";

export const generateDeviceToken = async (payload: ITokenPayload) => {
  const token = jwt.sign(payload, env.SECRET_SESSION_KEY);
  await User.findByIdAndUpdate(payload.uid, { deviceTokens: token });
  return token;
};

export const generateSessionToken = async (payload: ITokenPayload) => {
  try {
    // Generate session token
    const token = jwt.sign(payload, env.SECRET_SESSION_KEY);

    // Add session token to related field in database.
    await addTokenToUserDocument(payload.uid, token);

    return token;
  } catch (error) {
    throw new Error(error);
  }
};

export const removeSessionToken = async (uid: string, token: string) => {
  await User.findByIdAndUpdate(uid, {
    $pull: {
      sessionTokens: token,
    },
  });
};

export const resetDeviceToken = async (uid: string) => {
  await User.findByIdAndUpdate(uid, { deviceTokens: "" });
};

export const resetSessionTokens = async (uid: string) => {
  await User.findByIdAndUpdate(uid, { sessionTokens: [] });
};

const addTokenToUserDocument = async (uid: string, token: string) => {
  try {
    await User.updateOne(
      { _id: uid },
      {
        $push: {
          sessionTokens: token,
        },
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};
