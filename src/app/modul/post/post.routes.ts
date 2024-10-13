import express from "express";
import validationRequest from "../../meddleware/validationRequest";
import { PostValidation } from "./post.validation";
import { PostController } from "./post.controler";
import auth from "../../meddleware/auth";

const routes = express.Router();

routes.post(
  "/create",
  auth("user"),
  validationRequest(PostValidation.postValidationSchema),
  PostController.createPost
);

routes.get("/", PostController.getAllPost);

export const PostRoute = routes;
