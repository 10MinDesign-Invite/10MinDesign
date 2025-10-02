"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  HiOutlineArrowTrendingDown,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";
import { MdGroupRemove } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import { CountUpCustome } from "../components/CountUpCustome";
import DoughnutChart from "../components/DoughnutChart";
import { ToolTipDisplyInfo } from "../components/ToolTipDisplyInfo";
import {
  getTotal_Gmail_Google_User_Count,
} from "../Quries/getUsersData";

export const DashboardDesign = ({ authData }: { authData: string }) => {
  const { data: authTotal } = useQuery({
    queryKey: ["total_auth_data"],
    queryFn: getTotal_Gmail_Google_User_Count,
    staleTime: 1000 * 60 * 10,
  });

  const [total_Google_Users, setTotal_Google_Users] = useState(0);
  const [total_Gmail_Users, setTotal_Gmail_Users] = useState(0);

  useEffect(() => {
    if (authTotal) {
      const googleUsers = authTotal.filter((cur: string) => cur === "google");
      const gmailUsers = authTotal.filter((cur: string) => cur === "credential");

      setTotal_Google_Users(googleUsers.length);
      setTotal_Gmail_Users(gmailUsers.length);
    }
  }, [authTotal]);

  const totalUsers = authTotal?.length || 0;

  // ✅ Correct percentage calculation
  const google_Percent = totalUsers > 0
    ? ((total_Google_Users / totalUsers) * 100).toFixed(2)
    : "0";

  const gmail_Percent = totalUsers > 0
    ? ((total_Gmail_Users / totalUsers) * 100).toFixed(2)
    : "0";

  return (
    <section className="h-full w-full relative overflow-x-hidden">
      <div className="p-2 mt-3 mb-1 lg:px-3">
        <p className="text-4xl font-bold">Welcome Back !</p>
        <p className="text-lg">{authData}</p>
        <p className="mt-3 text-slate-500">Start Managing Things...</p>
      </div>
      <hr className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]" />

      <div className="relative w-full mt-3 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

        {/* Total Users */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl bg-black p-1 text-white rounded-full">
                <PiUsersThreeLight />
              </div>
              <p className="font-semibold">Total Users</p>
            </div>
            <ToolTipDisplyInfo description="Total Number of Users" />
          </div>
          <div className="mt-3 py-2 flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">
                <CountUpCustome value={totalUsers} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="text-blue-600 font-semibold">Neutral</div>
          </div>
          <p className="text-md">Details</p>
        </div>

        {/* Google Users */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl p-1 rounded-md base-shadow">
                <FcGoogle />
              </div>
              <p className="font-semibold">Google Users</p>
            </div>
            <ToolTipDisplyInfo description="Total Number of Google Users" />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">
                <CountUpCustome value={total_Google_Users} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="text-center">
              <div className={`text-5xl ${total_Google_Users >= total_Gmail_Users ? "text-green-400" : "text-red-400"}`}>
                {total_Google_Users >= total_Gmail_Users ? (
                  <HiOutlineArrowTrendingUp />
                ) : (
                  <HiOutlineArrowTrendingDown />
                )}
              </div>
              <p className={`${google_Percent === "0" ? "text-gray-400" : "text-green-500"}`}>
                {google_Percent}%
              </p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        {/* Gmail Users */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl text-red-400 p-1 rounded-md base-shadow">
                <SiGmail />
              </div>
              <p className="font-semibold">Gmail Users</p>
            </div>
            <ToolTipDisplyInfo description="Total Number of Gmail Users" />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">
                <CountUpCustome value={total_Gmail_Users} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="text-center">
              <div className={`text-5xl ${total_Gmail_Users >= total_Google_Users ? "text-green-400" : "text-red-400"}`}>
                {total_Gmail_Users >= total_Google_Users ? (
                  <HiOutlineArrowTrendingUp />
                ) : (
                  <HiOutlineArrowTrendingDown />
                )}
              </div>
              <p className={`${gmail_Percent === "0" ? "text-gray-400" : "text-green-500"}`}>
                {gmail_Percent}%
              </p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        {/* Removed Users */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-2">
              <div className="text-xl text-red-600 p-1 rounded-md base-shadow">
                <MdGroupRemove />
              </div>
              <p className="font-semibold">Removed Users</p>
            </div>
            <ToolTipDisplyInfo description="Total Number of Removed Users" />
          </div>
          <div className="mt-3 flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold">
                <CountUpCustome value={0} duration={3} />
              </p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div className="text-center text-black dark:text-white">
              Neutral
              <p>00</p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="mt-2 p-1">
        <div className="mx-auto flex flex-col md:flex-row gap-4">
          <div className="flex flex-col md:max-w-[50%] gap-2 p-3 shadow rounded-xl">
            <p className="text-3xl font-bold">Visual Preview</p>
            <div className="text-sm">
              See all the details in{" "}
              <span className="font-bold text-pink-500">Doughnut Chart</span>
            </div>
            <p className="font-semibold text-green-400">All the data</p>
          </div>
          <div className="md:max-w-[50%]">
            <DoughnutChart
              totalUsersData={totalUsers}
              total_Google_Users={total_Google_Users}
              total_Gmail_Users={total_Gmail_Users}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
