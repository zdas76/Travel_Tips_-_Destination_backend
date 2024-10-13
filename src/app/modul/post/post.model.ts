import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    comments: [
      {
        coment: { type: String },
        name: { type: String },
        email: { type: String },
        replay: [
          {
            coment: { type: String },
            name: { type: String },
            email: { type: String },
          },
        ],
      },
    ],
    vote: { type: Number, default: null },
    premium: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Post = model("Post", postSchema);
