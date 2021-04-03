import { NextFunction, Request, Response } from "express";

export const hasRole = (...roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Must validate JWT before",
      });
    }

    const { role } = req.user;
    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `This service require one of these roles: ${roles}`,
      });
    }

    next();
  };
};
