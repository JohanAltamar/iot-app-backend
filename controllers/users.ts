import { Request, Response } from "express";
import { genSaltSync, hashSync } from "bcryptjs";
import { User } from "../models";
import { errorLogs } from "../helpers";

export const createUser = async (req: Request, res: Response) => {
  try {
    let { body } = req;
    const user = req.user;

    // CREATE HASHED PASSWORD
    const salt = genSaltSync();
    body.password = hashSync(body.password, salt); // Encrypt password

    // CREATE NEW USER OBJECT
    const newUser = new User({ ...body, user });
    await newUser.save();

    res.json(newUser);
  } catch (error) {
    errorLogs.logger(error, res);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ status: true });
    res.json({
      results: users,
    });
  } catch (error) {
    errorLogs.logger(error, res);
  }
};
