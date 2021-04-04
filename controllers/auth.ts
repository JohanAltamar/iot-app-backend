import { Request, Response } from "express";
import { compareSync } from "bcryptjs";

import { User } from "../models";
import { errorLogs, tokens } from "../helpers";
import msg from "../helpers/serverMessages.json";
import { removeSessionToken } from "../helpers/tokens";

export const login = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { email, password } = body;

    // FOUND USER BY EMAIL
    const foundUser = await User.findOne({ email });

    // CHECK IF NO USER WAS FOUND
    if (!foundUser) {
      return res.status(401).json(msg["wrong-credential"]);
    }

    // CHECK IF GIVEN AND DATABASE PASSWORDS MATCH
    const matchedPasswords = compareSync(password, foundUser.password);
    if (!matchedPasswords) {
      return res.status(401).json(msg["wrong-credential"]);
    }

    // generate session token
    const token = await tokens.generateSessionToken({ uid: foundUser._id });
    res.json({ sessionToken: token });
  } catch (error) {
    errorLogs.logger(error, res);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const token:string = req.header("x-session-key") || "";
    await removeSessionToken(user._id, token)
    res.json({
      msg: "user logout"
    })
  } catch (error) {
    errorLogs.logger(error, res)
  }
};

export const newDeviceToken = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { uid, group } = user;

    // GENERATE DEVICE TOKEN
    const devicesToken = await tokens.generateDeviceToken({ uid, group });
    res.json({ devicesToken });
  } catch (error) {
    errorLogs.logger(error, res);
  }
};
