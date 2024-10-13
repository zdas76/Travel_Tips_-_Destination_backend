import { TCategoty } from "./category.interface";
import { Category } from "./caregory.model";

const createCategoryDB = async (payLoad: TCategoty) => {
  const result = await Category.create(payLoad);

  return result;
};

const getAllCategoryDB = async () => {
  const result = await Category.find();

  return result;
};

const updateCategoryDB = async (id: string, payLoad: any) => {
  const result = await Category.findByIdAndUpdate(id, payLoad);

  return result;
};

const deletCategoryDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);

  return result;
};

export const CategoryService = {
  createCategoryDB,
  getAllCategoryDB,
  updateCategoryDB,
  deletCategoryDB,
};
