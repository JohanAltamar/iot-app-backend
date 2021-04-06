import { Router } from "express";
import { validateSessionToken } from "../middlewares/tokens";
import { getDevicesByRoomId } from "../controllers/devices";

const router = Router();

/**
 * GET DEVICES BY ROOM ID
 * Protected route
 */
router.get("/rooms/:id", [validateSessionToken], getDevicesByRoomId);

export default router;
