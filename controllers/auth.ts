import { Request, Response } from "express";
import { compareSync } from "bcryptjs";

import { User } from "../models";
import { errorLogs, tokens } from "../helpers";
import msg from "../helpers/serverMessages.json";

export const login = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const { email, password } = body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(401).json(msg["wrong-credential"]);
    }

    const matchedPasswords = compareSync(password, foundUser.password);
    if (matchedPasswords) {
      // generate token
      const token = await tokens.generateSessionToken({ uid: foundUser._id });
      res.json({ sessionToken: token });
    } else {
      res.status(401).json(msg["wrong-credential"]);
    }
  } catch (error) {
    errorLogs.logger(error, res);
  }
};
