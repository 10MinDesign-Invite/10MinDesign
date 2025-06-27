"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { CiHome } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlSettings } from "react-icons/sl";
export const Sidebar = () => {
    const pathName = usePathname();
   
  return (
    <section className="hidden lg:block w-[330px] bg-white p-1 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className=" h-[50px] w-[95%] rounded-lg flex items-center gap-2 hover:bg-slate-50 mx-auto px-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <span className="h-[80%] w-[40px] rounded-lg bg-black text-white flex items-center justify-center text-[10px]">
                Invite
            </span>
            <div className=" h-full py-2 flex flex-col justify-center">
                <p className="font-bold">10MinDesign</p>
                <p className="text-[10px] pl- text-purple-500 font-bold">Admin</p>
            </div>
        </div>
        <div className="mt-7 px-2">
            <p className="text-[12px]">General</p>
            <ul className="flex flex-col gap-2 mt-2">
                <Link href={"/dashboard"} className={`flex items-center hover:bg-slate-50 px-2 py-1 rounded-lg gap-2 ${pathName == "/dashboard" ? "bg-slate-100" : ""}`}><span><LuLayoutDashboard/></span><li className="">Dashboard</li></Link>
                <Link href={"/"} className={`flex items-center hover:bg-slate-50 px-2 py-1 rounded-lg gap-2 ${pathName == "/home" ? "bg-slate-100" : ""}`}><span><CiHome /></span><li className="">Home</li></Link>
                <Link href={"/settings"} className={`flex items-center hover:bg-slate-50 px-2 py-1 rounded-lg gap-2 ${pathName == "/settings" ? "bg-slate-100" : ""}`}><span><SlSettings /></span><li className="">Settings</li></Link>
            </ul>
        </div> 
    </section>
  )
}
