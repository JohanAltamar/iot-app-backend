import jwt from "jsonwebtoken";

import env from "../env.config";
import { IDeviceTokenPayload, ITokenPayload } from "../interfaces";
import { Device, Group, User } from "../models";

export const generateDeviceToken = async (payload: IDeviceTokenPayload) => {
  const token = jwt.sign(payload, env.SECRET_SESSION_KEY);
  await Group.findByIdAndUpdate(payload.group, { devicesToken: token });
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

export const resetDeviceToken = async (groupID: string) => {
  await Group.findByIdAndUpdate(groupID, { devicesToken: "" });
};

export const resetSessionTokens = async (uid: string) => {
  await User.findByIdAndUpdate(uid, { sessionTokens: [] });
};

export const validateDeviceToken = async (
  deviceToken: string,
  deviceID: string
) => {
  try {
    const { group } = <IDeviceTokenPayload>(
      jwt.verify(deviceToken, env.SECRET_SESSION_KEY)
    );
    const deviceFound = await Device.findOne({
      _id: deviceID,
    }).populate({
      path: "room",
      match: { group },
    });

    return deviceFound ? true : false;
  } catch (error) {
    return false;
  }
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
