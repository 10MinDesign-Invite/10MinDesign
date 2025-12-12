import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, { message: "name is minnimum 2 char" }),
  email: z.string().email({ message: "invalid email format" }),
  password: z.string().min(6, { message: "password is min 6 char" }),
});

export const verifyuser = z.object({
  email: z.string().email({ message: "not valid email format" }),
});
export const loginSchema = z.object({
  email: z.string().email({ message: "not valid email format" }),
  password: z.string().min(6, { message: "min 6 char is nedded in password" }),
});
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "not valid email format" }),
  password: z.string().min(6, { message: "min 6 char is nedded in password" }),
  confirmPassword: z
    .string()
    .min(6, { message: "min 6 char is nedded in password" }),
  otp: z.string().min(6, { message: "wrong otp format" }),
});
