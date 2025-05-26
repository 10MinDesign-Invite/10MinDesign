"use server"
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";

export const loginHandler=async(email: string, password: string)=>{
   
   try {
    const result = await signIn("credentials",{
        email,
        password,
        redirect: false,
        redirectTo: "/"
    });
    if(result) return result
   } catch (error) {
    const err = error as CredentialsSignin;
    // return err.cause?.toString() || err.toString();
        return JSON.stringify(err.cause)
   }
}