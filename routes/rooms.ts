import { Router } from "express";
import { validateSessionToken } from "../middlewares/tokens";
import { getRoomsByUser, createRoom, getRoomInfoById } from '../controllers/rooms';
import { hasRole } from "../middlewares/roles";

const router = Router();

/**
 * GET ROOMS BY USER ID
 * Protected route
 */
router.get("/user/:id", [validateSessionToken], getRoomsByUser);

/**
 * GET ROOM INFO BY ID ROUTE
 * Protected route
 * Must be an allowed user or SUPER_ADMIN
 */
router.get("/:id", [validateSessionToken], getRoomInfoById)

/**
 * CREATE ROOMS ROUTE
 * Protected route
 * ADMIN or SUPER_ADMIN required
 */
router.post(
  "/",
  [validateSessionToken, hasRole("ADMIN_ROLE", "SUPER_ADMIN_ROLE")],
  createRoom
);

export default router;
