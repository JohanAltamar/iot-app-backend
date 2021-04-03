import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../env.config";
import msg from "../helpers/serverMessages.json";
import { ITokenPayload } from "../interfaces";
import { User } from "../models";

export const validateSessionToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.header("x-session-key") || "";

    // CHECK IF VALID TOKEN WAS PROVIDED
    if (token.length < 10) {
      return reAuthenticate(res);
    }

    // EXTRACT TOKEN INFO
    const { uid } = <ITokenPayload>jwt.verify(token, env.SECRET_SESSION_KEY);

    // FIND USER BY UID IN DATABASE
    const user = await User.findById(uid);

    // CHECK IF USER EXISTS || CHECK USER STATUS
    if (!user || !user.status) {
      return reAuthenticate(res);
    }

    // ADD USER INFO TO A REQUEST
    req.user = user;

    next();
  } catch (error) {
    reAuthenticate(res);
  }
};

const reAuthenticate = (res: Response) => {
  res.status(401).json(msg["re-authenticate"]);
};
