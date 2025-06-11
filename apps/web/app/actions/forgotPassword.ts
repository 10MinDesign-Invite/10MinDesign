"use server";
import { cookies } from "next/headers";

export async function forgotPassword(formData: FormData, otp: string) {
  try {
    const cookieStore = cookies();
    const myCookie = (await cookieStore).get("token");
    if (!myCookie?.value) {
      return {
        success: false,
        message: "No token found",
      };
    }

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("ConfirmPassword") as string;
    const response = await fetch(`${process.env.NEXT_PUBLIC_Backend_URL}/forgot/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        token: myCookie.value,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      return {
        success: true,
        message: data.message || "Password reset successfully",
      };
    } else {
      return {
        success: false,
        message: data.message || "Failed to reset password",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.toString(),
    };
  }
}
