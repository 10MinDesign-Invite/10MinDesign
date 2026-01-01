"use client"
import axios from "axios";
import { useState } from "react";

export function usePurchesedTemplate(templateName:string){
    const [purchased, setPurchased] = useState(false);
    async function getCookie(templateName:string){
        const result = await axios.post(`${process.env.NEXT_PUBLIC_Backend_URL}/purchased/template`,{templateName},{withCredentials:true})
        if(result.status === 200){
            setPurchased(true)
        }
    }
    getCookie(templateName);
    return {purchased}
}