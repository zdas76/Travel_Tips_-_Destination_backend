import { z } from "zod";

const loginUserValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string({ required_error: "Password is required" }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: "Refresh token is required",
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Use id is required" }),
  }),
});
const resetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Use id is required" }),
    newPassword: z.string({ required_error: "Passward is required" }),
  }),
});

export const AuthValidattion = {
  loginUserValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
