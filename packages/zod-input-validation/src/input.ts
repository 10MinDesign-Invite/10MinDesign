import z from "zod";

export const forgotPasswordSchema = z.object({
    email:z.string().email({message:"not valid email format"}),
    password:z.string().min(6,{message:"min 6 char is nedded in password"}),
    confirmPassword:z.string().min(6,{message:"min 6 char is nedded in password"}),
    otp:z.string().min(6,{message:"wrong otp format"})
})

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});