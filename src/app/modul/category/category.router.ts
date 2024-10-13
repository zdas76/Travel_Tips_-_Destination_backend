import express from "express";
import validationRequest from "../../meddleware/validationRequest";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controler";
import auth from "../../meddleware/auth";

const routes = express.Router();

routes.post(
  "/create",
  auth("admin"),
  validationRequest(CategoryValidation.categoryValidationSchema),
  CategoryController.createCategory
);

routes.put(
  "/:id",
  auth("admin"),
  validationRequest(CategoryValidation.categoryValidationSchema),
  CategoryController.updateCategory
);

routes.delete("/:id", auth("admin"), CategoryController.deleteCategory);

routes.get("/", CategoryController.getAllCategory);

export const CategoryRouter = routes;
