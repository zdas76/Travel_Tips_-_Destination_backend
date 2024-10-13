import { TUser } from "../user/user.interfact";
import { TPost } from "./post.interface";
import { Post } from "./post.model";

const creatPostToDB = async (payLoad: TPost, userId: string) => {
  const postdata = {
    userId,
    category: payLoad.category,
    title: payLoad.title,
    description: payLoad.description,
    image: payLoad.image,
    premium: payLoad.premium,
  };
  const result = await Post.create(postdata);
  return result;
};

const getAllPostFormDB = async () => {
  const result = await Post.find();

  return result;
};

export const PostService = {
  creatPostToDB,
  getAllPostFormDB,
};
