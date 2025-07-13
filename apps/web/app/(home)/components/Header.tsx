"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
gsap.registerPlugin(useGSAP);
// gsap code importss
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { FaPeopleRoof } from "react-icons/fa6";
import {
  GiFireSilhouette,
  GiFireworkRocket,
  GiStripedSun,
} from "react-icons/gi";
import { IoIosRose } from "react-icons/io";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { SlArrowDown, SlMenu } from "react-icons/sl";
import { logofont } from "../../fonts/fonts-config";
import { Profile } from "./Profile";
import axios from "axios";

interface propType {
  disableAnimation?: string;
}

export function Header({ disableAnimation }: propType) {
  const { data: authData } = useSession();
  const [nav, setNav] = useState<boolean>(false);
  const [curNav, setCurNav] = useState({ explore: false });
  const [theme, setTheme] = useState("light");

  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };
  
  useGSAP(() => {
    let mm = gsap.matchMedia();
    if (disableAnimation == "") {
      mm.add("(min-width: 769px)", () => {
        gsap.set(".logo", {
          x: 550,
          y: 350,
          scale: 9,
          opacity: 0,
        });
        gsap.to(".logo", {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
        });

        gsap.to("#primium-btn", {
          scale: 1,
          transformOrigin: "center",
          duration: 1,
        });
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set("header", {
          opacity: 0,
          y: -40,
        });
        gsap.to("header", {
          y: 0,
          opacity: 1,
          duration: 1,
        });
      });
    }
  }, []);
  useEffect(() => {
    async function getUser() {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_Backend_URL}/verify/user`,
        {
          email: "spi@gmail.com",
          customeData: "select only email",
        }
      );
    }
    getUser();
  }, []);

  return (
    <header
      className={`max-w-[1440px] mx-auto flex justify-between pr-3 z-50 fixed top-0 left-0 right-0 backdrop-blur-xl ${disableAnimation == "" ? "lg:rounded-md opacity-0 sm:opacity-100 lg:opacity-100" : ""}`}
    >
      <div className="flex p-1 py-4 gap-2 md:gap-[100px] borde">
        <div
          id="menuicon"
          onClick={() => {
            setNav(!nav);
          }}
          className="md:hidden flex justify-center items-center ml-2 md:ml-1 text-lg"
        >
          <SlMenu />
        </div>
        <Link
          href={"/"}
          className={`${logofont.className} pl-2 flex justify-center items-center cursor-pointer`}
        >
          <p
            className={`logo text-2xl lg:text-3xl ${disableAnimation == "" ? "md:opacity-0" : ""} lg:pl-3`}
          >
            Invite
          </p>
        </Link>
        <nav className="hidden md:flex gap-5 lg:gap-7">
          <Link
            href={"/"}
            className="text-[15px] flex justify-center items-center text-black hover:text-slate-600  dark:text-slate-400 dark:hover:text-white  font-medium cursor-pointer"
          >
            Home
          </Link>
          <div
            onClick={() =>
              setCurNav({ explore: curNav.explore ? false : true })
            }
            className="flex items-center gap-2 h-full text-[15px]  text-black hover:text-slate-600 dark:text-slate-400 dark:hover:text-white font-medium cursor-pointer"
          >
            Explore{" "}
            <p className="text-[10px] flex justify-center items-center">
              <SlArrowDown />
            </p>
          </div>
          <Link
            href={"/pricing"}
            className="text-[15px] flex justify-center items-center text-black hover:text-slate-600  dark:text-slate-400 dark:hover:text-white  font-medium cursor-pointer"
          >
            Pricing
          </Link>
          <Link
            href={"/social"}
            className="text-[15px] flex justify-center items-center text-black hover:text-slate-600 dark:text-slate-400 dark:hover:text-white  font-medium cursor-pointer"
          >
            Social
          </Link>
          <Link
            href={"/about"}
            className="text-[15px] flex justify-center items-center text-black hover:text-slate-600 dark:text-slate-400 dark:hover:text-white  font-medium cursor-pointer"
          >
            About
          </Link>
        </nav>
      </div>

      <div className="flex p-1 py-4 gap-[10px] borde">
        <div
          onClick={toggleDarkMode}
          className="flex justify-center items-center w-[30px] text-xl rounded-full"
        >
          {theme == "dark" ? (
            <GiStripedSun className="text-[rgb(247,164,70)]" />
          ) : (
            <BsFillMoonStarsFill />
          )}
        </div>
        <div className="cursor-pointer">
          {authData?.user != null && authData.user != undefined ? (
            <Profile authData={authData?.user} />
          ) : (
            <Link href={"/login"}>
              <button
                className={`w-[60px] md:w-[70px] h-[35px] md:h-[44px] rounded-md font-medium bg-black text-white dark:bg-white dark:text-black transform ${
                  disableAnimation == "" ? "" : ""
                }`}
              >
                Log in
              </button>
            </Link>
          )}
        </div>
        <div
          id="primium-btn"
          className={`flex dark:border-2 dark:border-white justify-center items-center borde px-2 md:px-5 lg:px-7 text-[14px] rounded-md font-light get_primium hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black text-black dark:bg-black dark:text-white cursor-pointer transform ${disableAnimation == "" ? "md:scale-0" : ""}`}
        >
          Get Premium
        </div>
      </div>

      {/* nav */}
      <div className=" md:hidden absolute top-[65px] w-full bg-slate-100 dark:bg-black">
        {nav && (
          <nav className="flex flex-col pl-4 text-xl gap-2 py-3 w-[95%]">
            <Link className="" href={"/"}>
              Home
            </Link>
            <div
              onClick={() =>
                setCurNav((prev) => ({
                  explore: curNav.explore ? false : true,
                }))
              }
              className={`flex gap-1 cursor-pointer`}
            >
              Explore
              <p
                className={`text-[10px] flex justify-center items-center ${curNav.explore ? "rotate-180" : ""}`}
              >
                <SlArrowDown />
              </p>
            </div>
            <div
              className={`${curNav.explore ? "outline rounded-xl" : "outline-none"}`}
            >
              {curNav.explore && (
                <div className=" ml-2 p-3 rounded-xl">
                  {curNav.explore && (
                    <div className=" p-1 text-sm grid grid-cols-3 gap-2">
                      <Link
                        href={"/category/wedding"}
                        className="flex justify-center items-center gap-1 border py-1 hover:dark:text-black hover:bg-white rounded-lg dark:text-white transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                      >
                        <IoIosRose className="text-2xl text-red-500" /> Wedding
                      </Link>
                      <Link
                        href={"/category/rip"}
                        className="flex justify-center items-center gap-1 border py-1 hover:dark:text-black hover:bg-white rounded-lg dark:text-white transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                      >
                        <GiFireSilhouette className="text-2xl text-orange-400" />
                        Rip
                      </Link>
                      <Link
                        href={"/category/birthday"}
                        className="flex justify-center items-center gap-1 border py-1 hover:dark:text-black hover:bg-white rounded-lg dark:text-white transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                      >
                        <LiaBirthdayCakeSolid className="text-2xl text-amber-900" />
                        Birthday
                      </Link>
                      <Link
                        href={"/category/opening"}
                        className="flex justify-center items-center gap-1 border py-1 hover:dark:text-black hover:bg-white rounded-lg dark:text-white transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                      >
                        <FaPeopleRoof className="text-2xl text-blue-400" />
                        Opening
                      </Link>
                      <Link
                        href={"/category/festival"}
                        className="flex justify-center items-center gap-1 border py-1 hover:dark:text-black hover:bg-white rounded-lg dark:text-white transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                      >
                        <GiFireworkRocket className="text-2xl text-green-600" />
                        Festival
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <Link className="-mt-2" href={"/pricing"}>
              Pricing
            </Link>
            <Link className="" href={"/about"}>
              About
            </Link>
            <Link className="" href={"/social"}>
              social
            </Link>
          </nav>
        )}
      </div>

      <div
        className={`dark:bg-gradient-to-bl from-yellow-200 via-lime-400 to-green-600 p-5 bg-white text-black  dark:text-black rounded-md w-[70%] top-[79px] ml-[165px] hidden md:${curNav.explore ? "flex absolute" : "hidden"}`}
      >
        {curNav.explore && (
          <nav className=" w-[100%] ">
            <div className="mb-6 flex justify-between">
              Categories{" "}
              <p
                onClick={() => setCurNav({ explore: false })}
                className="w-[15px] cursor-pointer h-[15px] rounded-full p-1 bg-red-600"
              ></p>
            </div>
            <div className="grid gap-4 grid-cols-3 ">
              <Link
                href={"/category/wedding"}
                className=" flex justify-center items-center gap-1 border py-3 hover:bg-white rounded-lg transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              >
                <IoIosRose className="text-2xl text-red-500" /> Wedding
              </Link>
              <Link
                href={"/category/rip"}
                className=" flex justify-center items-center gap-1 border py-3 hover:bg-white rounded-lg transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              >
                <GiFireSilhouette className="text-2xl text-orange-400" />
                Rip
              </Link>
              <Link
                href={"/category/birthday"}
                className=" flex justify-center items-center gap-1 border py-3 hover:bg-white rounded-lg transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              >
                <LiaBirthdayCakeSolid className="text-2xl text-amber-900" />
                Birthday
              </Link>
              <Link
                href={"/category/opening"}
                className=" flex justify-center items-center gap-1 border py-3 hover:bg-white rounded-lg transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              >
                <FaPeopleRoof className="text-2xl text-blue-400" />
                Opening
              </Link>
              <Link
                href={"/category/festival"}
                className=" flex justify-center items-center gap-1 border py-3 hover:bg-white rounded-lg transform hover:-translate-y-1 transition duration-400 hover:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
              >
                <GiFireworkRocket className="text-2xl text-green-600" />
                Festival
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
{
  /* <Link href={"/login"}>
              <button
                id="login-btn"
                className={`w-[60px] md:w-[70px] h-[35px] md:h-[44px] rounded-md font-medium bg-black text-white dark:bg-white dark:text-black transform ${
                  disableAnimation == "" ? "md:scale-0" : ""
                }`}
              >
                Log in
              </button>
            </Link> */
}
