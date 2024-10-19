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
        comment: { type: String },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        replay: [
          {
            comment: { type: String },
            userId: { type: Schema.Types.ObjectId, ref: "User" },
          },
        ],
      },
    ],
    vote: [
      {
        value: { type: String },
        user: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],

    premium: { type: Boolean, default: false },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

postSchema.virtual("totalUpVotes").get(function () {
  return this.vote.filter((item) => item.value === "1");
});

postSchema.virtual("totalDownVotes").get(function () {
  return this.vote.filter((item) => item.value === "2");
});

export const Post = model("Post", postSchema);
