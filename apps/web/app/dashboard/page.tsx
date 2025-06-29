import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import { PiUsersThreeLight } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import { CountUpCustome } from "./components/CountUpCustome";
import { ToolTipDisplyInfo } from "./components/ToolTipDisplyInfo";
import { MdGroupRemove } from "react-icons/md";
import DoughnutChart from "./components/DoughnutChart";

export default async function Dashboard() {
  const authdata = await auth();
  if (authdata?.user?.email == null) return redirect("/login");
  let googleUsers = 20010;
  let gmailUsers = 200;

  return (
    <section className="h-full w-full relative overflow-x-hidden">
      <div className="p-2 mt-3 mb-1 lg:px-3">
        <p className="text-4xl font-bold">Welcome Back !</p>
        <p className="text-lg">{authdata?.user?.name}</p>
        <p className="mt-3 text-slate-500">Start Managing Things...</p>
      </div>
      <hr className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]" />

      <div className="relative w-full mt-3 overflow-x-hidden p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className=" flex justify-center items-center gap-2">
              <div className="text-xl bg-black p-1 text-white rounded-full">
                <PiUsersThreeLight />
              </div>
              <p className="font-semibold">Total Users</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo description={"Total Number of Users"} />
            </div>
          </div>
          <div className="mt-3 py-2 w-full flex justify-between items-center">
            <div className="">
              <p className="text-3xl font-bold">
                <CountUpCustome value={2000} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="">
              <div className="text-md text-blue-600">Neutral</div>
              <p className="text-blue-600 font-semibold">00</p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className=" flex justify-center items-center gap-2">
              <div className="text-xl p-1 rounded-md base-shadow">
                <FcGoogle />
              </div>
              <p className="font-semibold">Total Users</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo description={"Total Number of Google Users"} />
            </div>
          </div>
          <div className="mt-3 w-full flex justify-between items-center">
            <div className="">
              <p className="text-3xl font-bold">
                <CountUpCustome value={1800} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="">
              <div
                className={`text-5xl ${googleUsers > gmailUsers ? "text-green-400" : "text-red-400"}`}
              >
                {googleUsers > gmailUsers ? (
                  <HiOutlineArrowTrendingUp />
                ) : (
                  <HiOutlineArrowTrendingDown />
                )}
              </div>
              <div className="">
                <p className="">percent</p>
                <div className=""></div>
              </div>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className=" flex justify-center items-center gap-2">
              <div className="text-xl text-red-400 p-1 rounded-md base-shadow">
                <SiGmail />
              </div>
              <p className="font-semibold">Total Users</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo description={"Total Number of Gmail Users"} />
            </div>
          </div>
          <div className="mt-3 w-full flex justify-between items-center">
            <div className="">
              <p className="text-3xl font-bold">
                <CountUpCustome value={200} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="">
              <div
                className={`text-5xl ${googleUsers < gmailUsers ? "text-green-400" : "text-red-400"}`}
              >
                {googleUsers < gmailUsers ? (
                  <HiOutlineArrowTrendingUp />
                ) : (
                  <HiOutlineArrowTrendingDown />
                )}
              </div>
              <div className="">
                <p className="">percent</p>
                <div className=""></div>
              </div>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className=" flex justify-center items-center gap-2">
              <div className="text-xl text-red-600 p-1 rounded-md base-shadow">
                <MdGroupRemove />
              </div>
              <p className="font-semibold">Total Users</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo
                description={"Total Number of Removed Users"}
              />
            </div>
          </div>
          <div className="mt-3 py-2 w-full flex justify-between items-center">
            <div className="">
              <p className="text-3xl font-bold">
                <CountUpCustome value={0} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="">
              <div className={`text-md text-black`}>Neutral</div>
              <div className="">
                <p className="">00</p>
                <div className=""></div>
              </div>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>
      </div>

      <div className=" mt-2 p-1">
        <div className="mx-auto flex justify-center items-center md:items-start flex-col md:flex-row gap-4">

          <div className="flex flex-col md:max-w-[50%] gap-2 p-3 dark:shadow-[0px_0px_5px_0px_#cbd5e0] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl">
            <p className="text-3xl font-bold">Visual Preview</p>
            <div className="text-sm">
              See all the details in{" "}
              <span className="font-bold text-pink-500">Doughnut Chart</span> in
              understandable format
            </div>
            <p className="font-semibold text-green-400">All the data</p>

            <div className="max-w-[70%] mx-auto">

              <div className="flex gap-1">
                    <div className="rounded-full bg-black text-white  text-xl w-[24px] flex items-center justify-center">
                      <PiUsersThreeLight />
                    </div>
                  <p className="font-semibold text-sm">Total Users</p>
              </div>
              <div className="flex gap-1">
                    <div className="rounded-full text-white  text-xl w-[25px] flex items-center justify-center">
                      <FcGoogle />
                    </div>
                  <p className="font-semibold text-sm">Total Users</p>
              </div>
              <div className="flex gap-1">
                    <div className="rounded-sm text-red-400  text-xl w-[25px] flex items-center justify-center">
                      <SiGmail />
                    </div>
                  <p className="font-semibold text-sm">Total Users</p>
              </div>

              
            </div>
          </div>

          <div className="md:max-w-[50%] lg:">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </section>
  );
}
