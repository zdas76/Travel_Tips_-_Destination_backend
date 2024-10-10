import express from "express";
import { AuthRouter } from "../modul/auth/auth.route";
import { UserRouter } from "../modul/user/user.route";
import { CategoryRouter } from "../modul/category/category.router";

const router = express.Router();

const modulRoutes = [
  { path: "/auth/", route: AuthRouter },
  { path: "/user/", route: UserRouter },
  { path: "/category/", route: CategoryRouter },
];

modulRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
