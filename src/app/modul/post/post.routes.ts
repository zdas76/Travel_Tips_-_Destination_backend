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

routes.put("/comment-update/:postId", PostController.updateToComment);

export const PostRoute = routes;
