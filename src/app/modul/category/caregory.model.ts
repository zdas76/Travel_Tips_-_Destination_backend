import { model, Schema } from "mongoose";
import { TCategoty } from "./category.interface";

const categorySchema = new Schema<TCategoty>(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

export const Category = model("Category", categorySchema);
