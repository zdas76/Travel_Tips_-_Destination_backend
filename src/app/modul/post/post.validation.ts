import { z } from "zod";

const replayValidationSchema = z.object({
  comment: z.string().optional(),
  userId: z.string(),
});

const comentValidationSchema = z.object({
  comment: z.string().optional(),
  userId: z.string().optional(),
  replay: z.array(replayValidationSchema).optional(),
});

const voteValidationSchema = z.object({
  value: z.string(),
  user: z.string(),
});
const postValidationSchema = z.object({
  body: z.object({
    category: z.string({ required_error: "Category Name is Reqired" }),
    title: z.string({ required_error: "Title is Reqired" }),
    description: z.string({ required_error: "Description is Reqired" }),
    image: z.string({ required_error: "Image is Reqired" }),
    comments: z.array(comentValidationSchema).optional(),
    vote: z.array(voteValidationSchema).optional(),
    premium: z.boolean().optional(),
  }),
});

export const PostValidation = {
  postValidationSchema,
};
