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

const getLoginUserAllPost = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const result = await PostService.getAllPostByLodinUserFormDB(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Pose get successfully",
    data: result,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const result = await PostService.getPostByIDFormDB(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post updated successfully",
    data: result,
  });
});


const addToComment = catchAsync(async (req, res) => {

  const result = await PostService.addComment(req.params.postId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comments Added successfully",
    data: result,
  });
});

const updateToComment = catchAsync(async (req, res) => {

  const result = await PostService.updateComment(req.params.postId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comments Added successfully",
    data: result,
  });
});


const deleteToComment = catchAsync(async (req, res) => {
  console.log(req.params, req.query, req.body)

  const result = await PostService.deleteComment(req.body.postId, req.body.commentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comments deleted successfully",
    data: result,
  });
});

const addToVote = catchAsync(async (req, res) => {

  const result = await PostService.addComment(req.params.postId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comments Added successfully",
    data: result,
  });
});

const updateToVote = catchAsync(async (req, res) => {

  const result = await PostService.updateComment(req.params.postId, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comments Added successfully",
    data: result,
  });
});


export const PostController = {
  createPost,
  getAllPost,
  getLoginUserAllPost,
  addToComment,
  getPostById,
  updateToComment,
  deleteToComment,
  addToVote,
  updateToVote
};
