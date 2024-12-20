import { TUser } from "../user/user.interfact";
import { IComment, TPost } from "./post.interface";
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

const getAllPostByLodinUserFormDB = async (id: string) => {
  const result = await Post.find({ userId: id }).populate("userId").populate({
    path: "comments",
    populate: "userId",
  });

  return result;
};

const getPostByIDFormDB = async (id: string) => {
  const result = await Post.findById(id).populate("userId").populate({
    path: "comments",
    populate: "userId",
  });;

  return result;
};

const addComment = async (id: string, payload: IComment) => {
  
  const result = await Post.findByIdAndUpdate(
    id,
    { $addToSet: { comments: payload } },
    { new: true }
  );
  return result;
};

const updateComment = async (id: string, payload: any) => {
  
  const result = await Post.findOneAndUpdate(
    {_id: id, "comments._id":  payload.commentId}, 
    { $set: { "comments.$.comment": payload.comment} },
    { new: true }
  );
  return result;
};

const deleteComment = async (postId: string, commentId: any) => {
  console.log(postId, commentId)
  
  const result = await Post.findOneAndDelete(
    {_id: postId, "comments._id":  commentId}, 
  );
  return result;
};


const addVote = async (id: string, payload: IComment) => {
  
  const result = await Post.findByIdAndUpdate(
    id,
    { $addToSet: { vote: payload } },
    { new: true }
  );
  return result;
};

const updateVote = async (id: string, payload: any) => {
  
  const result = await Post.findOneAndUpdate(
    {_id: id, "vote._id":  payload.voteId}, 
    { $set: { "vote.$.value": payload.value} },
    { new: true }
  );
  return result;
};


export const PostService = {
  creatPostToDB,
  getAllPostFormDB,
  getAllPostByLodinUserFormDB,
  getPostByIDFormDB,
  addComment,
  updateComment,
  deleteComment,
  addVote,
  updateVote
};
