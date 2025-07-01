"use client";
import { HiOutlineBars3 } from "react-icons/hi2";
import { DarkModeToggle } from "./DarkModeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { CiHome } from "react-icons/ci";
import { SlSettings } from "react-icons/sl";
import { usePathname } from "next/navigation";

export const MobileNav = () => {
  const pathName = usePathname();

  return (
    <Sheet>
      <div className="flex justify-between items-center mb-1 px-2 ">
        <SheetTrigger>
          <div className="text-3xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
            <HiOutlineBars3 />
          </div>
        </SheetTrigger>

        <DarkModeToggle />
      </div>

      <SheetContent
        side={"left"}
      >
        <SheetHeader>
          <SheetTitle />
          <section className="">
            <div className="h-[50px] w-[95%] rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-black mx-auto px-2 dark:shadow-[0px_0px_5px_0px_#cbd5e0] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              <span className="h-[80%] w-[40px] rounded-lg bg-black text-white dark:bg-slate-300 dark:text-black flex items-center justify-center text-[10px]">
                Invite
              </span>
              <div className="h-full py-2 flex flex-col justify-center">
                <div className="font-bold">10MinDesign</div>
                <div className="text-[10px] text-purple-500 font-bold">
                  Admin
                </div>
              </div>
            </div>

            <div className="mt-7 px-2">
              <div className="text-[12px] text-left mb-1">General</div>
              <ul className="flex flex-col gap-2 mt-2">
                <li>
                  <Link
                    href="/dashboard"
                    className={`flex items-center hover:bg-slate-50 dark:text-black px-2 py-1 rounded-lg gap-2 ${
                      pathName === "/dashboard" ? "bg-slate-100" : ""
                    }`}
                  >
                    <LuLayoutDashboard />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className={`flex items-center hover:bg-slate-50 dark:hover:bg-slate-300 dark:hover:text-black px-2 py-1 rounded-lg gap-2 ${
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
                    className={`flex items-center hover:bg-slate-50 dark:hover:bg-slate-300 dark:hover:text-black px-2 py-1 rounded-lg gap-2 ${
                      pathName === "/dashboard/settings" ? "bg-slate-100" : ""
                    }`}
                  >
                    <SlSettings />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
    // </div>
  );
};
