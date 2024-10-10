import httpStatus from "http-status";
import sendResponse from "../../Utiles/sendResponst";
import { AuthService } from "./auth.service";
import catchAsync from "../../meddleware/catchAsync";

const createUser = catchAsync(async (req, res) => {
  const result = await AuthService.createUserInToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  console.log(result);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User logged in successfully",
    // data: result,
    accessToken: result?.accessToken,
    refreshToken: result?.refreshToken,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const email = req.body.email;

  const result = await AuthService.forgetPassword(email);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Reset link isgenerated successfully",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await AuthService.refreshToken(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "tone created successfully",
    accessToken: result.accessToken,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization as string;

  const result = await AuthService.resetPassword(req.body, token);

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "Passward reset successfully",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
  forgetPassword,
  refreshToken,
  resetPassword,
};
