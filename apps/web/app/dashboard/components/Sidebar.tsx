"use client"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { CiHome } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { SlSettings } from "react-icons/sl";
import { DarkModeToggle } from "./DarkModeToggle";
export const Sidebar = () => {
    const pathName = usePathname();
   
  return (
    <section className="hidden lg:block w-[330px] p-1  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className=" h-[50px] w-[95%] rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:text-black dark:shadow-[0px_0px_5px_0px_#cbd5e0] mx-auto px-2 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <span className="h-[80%] w-[40px] rounded-lg bg-black dark:bg-slate-200 dark:text-black text-white flex items-center justify-center text-[10px]">
                Invite
            </span>
            <div className=" h-full py-2 flex flex-col justify-center">
                <p className="font-bold ">10MinDesign</p>
                <p className="text-[10px] pl- text-purple-500 font-bold">Admin</p>
            </div>
        </div>
        <div className="mt-7 px-2">
            <div className="flex justify-between items-center">
              <p className="text-[12px]">General</p>
              <div className=""><DarkModeToggle/></div>
            </div>
            <ul className="flex flex-col gap-2 mt-2">
                  <li>
                    <Link
                      href="/dashboard"
                      className={`flex items-center hover:bg-slate-50 dark:hover:text-black px-2 py-1 rounded-lg gap-2 ${
                        pathName === "/dashboard" ? "bg-slate-200 dark:text-black" : ""
                      }`}
                    >
                      <LuLayoutDashboard />
                      <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/"
                      className={`flex items-center hover:bg-slate-200 dark:hover:text-black px-2 py-1 rounded-lg gap-2 ${
                        pathName === "/" ? "bg-slate-100" : ""
                      }`}
                    >
                      <CiHome />
                      <span>Home</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard/settings"
                      className={`flex items-center hover:bg-slate-200 dark:hover:text-black px-2 py-1 rounded-lg gap-2 ${
                        pathName === "/dashboard/settings" ? "bg-slate-200 dark:text-black" : ""
                      }`}
                    >
                      <SlSettings />
                      <span>Settings</span>
                    </Link>
                  </li>
                </ul>
        </div> 
    </section>
  )
}
