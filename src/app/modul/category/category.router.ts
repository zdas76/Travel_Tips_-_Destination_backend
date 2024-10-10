import express from "express";
import validationRequest from "../../meddleware/validationRequest";
import { CategoryValidation } from "./category.validation";
import { CategoryController } from "./category.controler";

const routes = express.Router();

routes.post(
  "/create",
  validationRequest(CategoryValidation.categoryValidationSchema),
  CategoryController.createCategory
);

routes.put(
  "/:id",
  validationRequest(CategoryValidation.categoryValidationSchema),
  CategoryController.updateCategory
);

routes.delete("/:id", CategoryController.deleteCategory);

routes.get("/", CategoryController.getAllCategory);

export const CategoryRouter = routes;
