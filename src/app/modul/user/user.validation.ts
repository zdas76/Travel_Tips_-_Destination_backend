import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    profileImage: z.string().optional(),
    phone: z.string(),
    address: z.string(),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    profileImage: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    status: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const UserValidattion = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
