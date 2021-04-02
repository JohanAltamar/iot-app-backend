import { Response } from "express";

export const logger = (error: Error, res: Response) => {
  console.log(error);
  res.status(500).json({
    msg: "something failed, contact the ",
  });
};
