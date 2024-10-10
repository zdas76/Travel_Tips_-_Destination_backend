import httpStatus from "http-status";
import { UserService } from "./user.service";
import catchAsync from "../../meddleware/catchAsync";
import sendResponse from "../../Utiles/sendResponst";

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserService.getAllUserFromBD();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrived successfully",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserService.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User delete successfuly",
    data: result,
  });
});

const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserService.updateUsertoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User delete successfuly",
    data: result,
  });
});

export const UserControllers = {
  getAllUser,
  deleteUser,
  updateUser,
};
