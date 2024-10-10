import httpStatus from "http-status";
import AppError from "../error/AppError";
import catchAsync from "./catchAsync";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modul/user/user.interfact";

const auth = (...reqiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const Bearertoken = req.headers.authorization;

    if (!Bearertoken) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const token = Bearertoken && Bearertoken.split(" ")[1];

    const decoded = jwt.verify(
      token,
      config.access_secret as string
    ) as JwtPayload;

    if (!decoded) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    const role = decoded?.role;

    if (reqiredRoles && !reqiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You have no access to this route"
      );
    }
    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
