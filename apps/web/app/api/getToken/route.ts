import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(){
    const allcookies = await cookies()
    const token = allcookies.get(`${process.env.NODE_ENV === 'development'? 'authjs.session-token':'__Secure-authjs.session-token'}`)?.value;
    if(!token) return NextResponse.json({error:"no token"});
    return NextResponse.json({token})
}