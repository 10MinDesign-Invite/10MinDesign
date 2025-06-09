"use server"

import axios from "axios";

export async function forgotPassword(email:string,password:string,confirmPassword:string){
    try {
        const result = await axios.put(`${process.env.NEXT_PUBLIC_Backend_URL}/forgot/password`,{
                email,
                confirmPassword
        })
        if(result.status == 200){
            return {
                success:true,
                message:"forgot password success"
            }
        }
        
    } catch (error) {
         return {
            success:false,
            message:"internal server error"
        }
    }

}

