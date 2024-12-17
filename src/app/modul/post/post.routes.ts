import express from "express";
import validationRequest from "../../meddleware/validationRequest";
import { PostValidation } from "./post.validation";
import { PostController } from "./post.controler";
import auth from "../../meddleware/auth";
import { USER_ROLE } from "../user/user.constants";

const routes = express.Router();

routes.post(
  "/create",
  auth("user"),
  validationRequest(PostValidation.postValidationSchema),
  PostController.createPost
);
routes.get("/login-user", auth("user"), PostController.getLoginUserAllPost);

routes.get("/", PostController.getAllPost);

routes.get("/:id", PostController.getPostById);

routes.put("/comment/:postId", PostController.addToComment);

routes.post("/comment-delete", PostController.deleteToComment);

routes.put("/comment-update/:postId", PostController.updateToComment);

routes.put("/vote/:postId", PostController.addToVote);

routes.put("/vote-update/:postId", PostController.updateToVote);

export const PostRoute = routes;
