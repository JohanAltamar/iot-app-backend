import { Router } from "express";
import { check } from "express-validator";
import { createUser, getSelfUserInfo, getUsers } from "../controllers/users";
import { hasRole } from "../middlewares/roles";
import { validateSessionToken } from "../middlewares/tokens";

const router = Router();

/**
 * GET ALL USERS ROUTE
 * Protected route
 * SUPER ADMIN ROLE required
 */
router.get("/", [validateSessionToken, hasRole("SUPER_ADMIN_ROLE")], getUsers);

/**
 * GET OWN USER INFO
 * Protected route 
 */
router.get("/get-info", [validateSessionToken], getSelfUserInfo)


/**
 * GET USERS BY GROUP ID ROUTE
 * Protected route
 * SUPER ADMIN ROLE has access to every app group
 * ADMIN ROLE has access to users under his group
 */
router.get(
  "/groups/:id",
  [validateSessionToken, hasRole("SUPER_ADMIN_ROLE", "ADMIN_ROLE")],
  getUsers
);

/**
 * GET USER BY ID ROUTE
 * Protected route
 * SUPER ADMIN ROLE has access to every app user
 * ADMIN ROLE has access to users under his group
 * USER ROLE has access to his own info
 */
router.get("/:id", [validateSessionToken], getUsers);

/**
 * CREATE USERS ROUTE
 * Protected route
 * SUPER ADMIN | ADMIN ROLE required
 * name, password, email required, email valid, group id valid and must exists,
 * role valid, status boolean if provided
 */
router.post(
  "/",
  [validateSessionToken, hasRole("SUPER_ADMIN_ROLE", "ADMIN_ROLE")],
  createUser
);

export default router;
