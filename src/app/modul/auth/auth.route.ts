import express from "express";
import { AuthControllers } from "./auth.controller";

import { AuthValidattion } from "./auth.validation";
import { UserValidattion } from "../user/user.validation";
import validationRequest from "../../meddleware/validationRequest";

const routes = express.Router();

routes.post(
  "/login",
  validationRequest(AuthValidattion.loginUserValidationSchema),
  AuthControllers.loginUser
);

routes.post(
  "/register",
  validationRequest(UserValidattion.createUserValidationSchema),
  AuthControllers.createUser
);

routes.post(
  "/refresh-token",
  validationRequest(AuthValidattion.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);

routes.post(
  "/forget-password",
  validationRequest(AuthValidattion.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);

routes.post(
  "/reset-password",
  validationRequest(AuthValidattion.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword
);

export const AuthRouter = routes;
