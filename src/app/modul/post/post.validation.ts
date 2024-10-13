import { z } from "zod";

const replayValidationSchema = z.object({
  coment: z.string().optional(),
  userName: z.string().optional(),
  userEmail: z.string().optional(),
});

const comentValidationSchema = z.object({
  coment: z.string().optional(),
  userName: z.string().optional(),
  userEmail: z.string().optional(),
  replay: z.array(replayValidationSchema).optional(),
});

const postValidationSchema = z.object({
  body: z.object({
    category: z.string({ required_error: "Category Name is Reqired" }),
    title: z.string({ required_error: "Title is Reqired" }),
    description: z.string({ required_error: "Description is Reqired" }),
    image: z.string({ required_error: "Image is Reqired" }),
    comments: z.array(comentValidationSchema).optional(),
    vote: z.number().optional(),
    premium: z.boolean().optional(),
  }),
});

export const PostValidation = {
  postValidationSchema,
};
