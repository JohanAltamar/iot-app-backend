import jwt from "jsonwebtoken";

import env from "../env.config";
import { ITokenPayload } from "../interfaces";
import { User } from "../models";

export const generateSessionToken = async (payload: ITokenPayload) => {
  // Generate session token
  const token = jwt.sign(payload, env.SECRET_SESSION_KEY);

  // Add session token to related field in database.
  await addTokenToUserDocument(payload.uid, token);

  return token;
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
    throw new Error("Add token to user failed, contact the administrator");
  }
};
