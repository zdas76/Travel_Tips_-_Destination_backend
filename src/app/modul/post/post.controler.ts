import httpStatus from "http-status";
import catchAsync from "../../meddleware/catchAsync";
import sendResponse from "../../Utiles/sendResponst";
import { PostService } from "./post.service";

const createPost = catchAsync(async (req, res) => {
  const userId = req.user._id;
  const result = await PostService.creatPostToDB(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pose create successfully",
    data: result,
  });
});

const getAllPost = catchAsync(async (req, res) => {
  const result = await PostService.getAllPostFormDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pose get successfully",
    data: result,
  });
});

export const PostController = {
  createPost,
  getAllPost,
};
