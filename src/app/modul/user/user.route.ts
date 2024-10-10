import express from "express";
import { UserControllers } from "./user.controller";

import { USER_ROLE } from "./user.constants";
import auth from "../../meddleware/auth";

const router = express.Router();

router.get("/", UserControllers.getAllUser);

router.delete("/:id", auth(USER_ROLE.admin), UserControllers.deleteUser);

router.put("/:id", auth(USER_ROLE.admin), UserControllers.updateUser);

export const UserRouter = router;
