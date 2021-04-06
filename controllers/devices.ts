import { Request, Response } from "express";
import { errorLogs } from "../helpers";
import { Device } from "../models";

export const getDevicesByRoomId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const devices = await Device.find({ room: id });
    res.json({
      results: devices,
    });
  } catch (error) {
    errorLogs.logger(error, res);
  }
};
