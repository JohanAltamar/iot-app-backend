import { Request, Response } from "express";
import { errorLogs } from "../helpers";
import { Room } from "../models";

export const getRoomInfoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    let roomInfo = await Room.findById(id);

    // CHECK IF ROOM EXISTS
    if (!roomInfo) {
      return res.status(400).json({
        msg: "Room not found. Please check",
      });
    }

    // IF SUPERADMIN THEN RETURNS COMPLETE INFO
    // IF ADMIN_ROLE AND AN ALLOWED USER THEN RETURNS COMPLETE INFO
    if (
      user.role === "SUPER_ADMIN_ROLE" ||
      (user.role === "ADMIN_ROLE" && roomInfo?.allowedUsers.includes(user._id))
    ) {
      return res.json({
        results: [roomInfo],
      });
    }

    // if allowed user, returns shortened info
    if (roomInfo?.allowedUsers.includes(user._id)) {
      // const shortenedInfo = {
      //   name: roomInfo.name,
      //   id: roomInfo._id
      // }
      const { allowedUsers, status, group, ...rest } = roomInfo.toJSON();

      return res.json({
        results: [rest],
      });
    }

    // USER NOT ALLOWED
    res.status(401).json({
      msg: "User not allowed in this room",
    });
  } catch (error) {
    errorLogs.logger(error, res);
  }
};

export const getRoomsByUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rooms = await Room.find({ allowedUsers: id });
    res.json({
      results: rooms,
    });
  } catch (error) {
    errorLogs.logger(error, res);
  }
};

export const createRoom = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const newRoom = new Room(body);
    await newRoom.save();

    res.json(newRoom);
  } catch (error) {
    errorLogs.logger(error, res);
  }
};
