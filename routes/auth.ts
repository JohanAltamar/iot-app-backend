import { Router } from "express";
import { login, logout, newDeviceToken } from "../controllers/auth";
import { hasRole } from "../middlewares/roles";
import { validateSessionToken } from "../middlewares/tokens";

const router = Router();

/**
 * USER LOGIN ROUTE
 * Public route
 * email required and valid, password required
 */
router.post("/login", login);

/**
 * USER LOGOUT ROUTE
 * Protected route
 */
router.post("/logout", [validateSessionToken], logout)

/**
 * CREATE A NEW GROUP DEVICES TOKEN ROUTE
 * Protected route
 * ADMIN ROLE required
 */
router.post(
  "/devices-token",
  [validateSessionToken, hasRole("ADMIN_ROLE")],
  newDeviceToken
);

export default router;
