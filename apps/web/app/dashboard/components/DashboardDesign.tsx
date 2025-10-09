// "use client";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
// import {
//   HiOutlineArrowTrendingDown,
//   HiOutlineArrowTrendingUp,
// } from "react-icons/hi2";
// import { MdGroupRemove } from "react-icons/md";
// import { PiUsersThreeLight } from "react-icons/pi";
// import { SiGmail } from "react-icons/si";
// import { CountUpCustome } from "../components/CountUpCustome";
// import DoughnutChart from "../components/DoughnutChart";
// import { ToolTipDisplyInfo } from "../components/ToolTipDisplyInfo";
// import {
//   getTotal_Gmail_Google_User_Count,
//   getTotal_User_Count,
// } from "../Quries/getUsersData";

// export const DashboardDesign = ({ authData }: { authData: string }) => {
//   const { data: totalUsersData } = useQuery({
//     queryKey: ["total_users_count"],
//     queryFn: getTotal_User_Count,
//     staleTime: 1000 * 60 * 10,
//   });

//   const { data: authTotal } = useQuery({
//     queryKey: ["total_auth_data"],
//     queryFn: getTotal_Gmail_Google_User_Count,
//     staleTime: 1000 * 60 * 10,
//   });

//   const [total_Google_Users, setTotal_Google_Users] = useState(0);
//   const [total_Gmail_Users, setTotal_Gmail_Users] = useState(0);

//   useEffect(() => {
//     if (Array.isArray(authTotal)) {
//       const googleUsers = authTotal.filter(
//         (user: { googleId: number | null }) => user.googleId != null
//       );
//       const gmailUsers = authTotal.filter(
//         (user: { googleId: number | null }) => user.googleId === null
//       );

//       setTotal_Google_Users(googleUsers.length);
//       setTotal_Gmail_Users(gmailUsers.length);
//     } else {
//       console.warn("⚠️ authTotal is not an array:", authTotal);
//       setTotal_Google_Users(0);
//       setTotal_Gmail_Users(0);
//     }
//   }, [authTotal]);

//   const google_Increase =
//     total_Gmail_Users > 0
//       ? ((total_Google_Users - total_Gmail_Users) / total_Gmail_Users) * 100
//       : 0;
//   const google_Percent = google_Increase.toFixed(2);

//   const gmail_Increase =
//     total_Google_Users > 0
//       ? ((total_Gmail_Users - total_Google_Users) / total_Google_Users) * 100
//       : 0;
//   const gmail_Percent = gmail_Increase.toFixed(2);

//   return (
//     <section className="h-full w-full relative overflow-x-hidden">
//       <div className="p-2 mt-3 mb-1 lg:px-3">
//         <p className="text-4xl font-bold">Welcome Back !</p>
//         <p className="text-lg">{authData}</p>
//         <p className="mt-3 text-slate-500">Start Managing Things...</p>
//       </div>
//       <hr className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]" />

//       {/* Cards Section */}
//       <div className="relative w-full mt-3 overflow-x-hidden p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//         {/* Total Users */}
//         <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
//           <div className="w-full flex justify-between">
//             <div className="flex justify-center items-center gap-2">
//               <div className="text-xl bg-black p-1 text-white rounded-full">
//                 <PiUsersThreeLight />
//               </div>
//               <p className="font-semibold">Total Users</p>
//             </div>
//             <div className="flex items-center justify-center text-xl">
//               <ToolTipDisplyInfo description={"Total Number of Users"} />
//             </div>
//           </div>
//           <div className="mt-3 py-2 w-full flex justify-between items-center">
//             <div>
//               <p className="text-3xl font-bold">
//                 <CountUpCustome value={totalUsersData?.length || 0} duration={3} />
//               </p>
//               <p className="text-[12px]">since 2025</p>
//             </div>
//             <div>
//               <div className="text-md text-blue-600">Neutral</div>
//               <p className="text-blue-600 font-semibold">00</p>
//             </div>
//           </div>
//           <p className="text-md">Details</p>
//         </div>

//         {/* Google Users */}
//         <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
//           <div className="w-full flex justify-between">
//             <div className="flex justify-center items-center gap-2">
//               <div className="text-xl p-1 rounded-md base-shadow">
//                 <FcGoogle />
//               </div>
//               <p className="font-semibold">Google Users</p>
//             </div>
//             <div className="flex items-center justify-center text-xl">
//               <ToolTipDisplyInfo description={"Total Number of Google Users"} />
//             </div>
//           </div>
//           <div className="mt-3 w-full flex justify-between items-center">
//             <div>
//               <p className="text-3xl font-bold">
//                 <CountUpCustome value={total_Google_Users} duration={3} />
//               </p>
//               <p className="text-[12px]">since 2025</p>
//             </div>
//             <div>
//               <div
//                 className={`text-5xl ${
//                   total_Google_Users > total_Gmail_Users
//                     ? "text-green-400"
//                     : "text-red-400"
//                 }`}
//               >
//                 {total_Google_Users > total_Gmail_Users ? (
//                   <HiOutlineArrowTrendingUp />
//                 ) : (
//                   <HiOutlineArrowTrendingDown />
//                 )}
//               </div>
//               <p
//                 className={`${
//                   google_Percent.includes("-")
//                     ? "text-red-500"
//                     : "text-green-500"
//                 }`}
//               >
//                 {total_Google_Users === 0 ? "loading" : google_Percent + "%"}
//               </p>
//             </div>
//           </div>
//           <p className="text-md">Details</p>
//         </div>

//         {/* Gmail Users */}
//         <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
//           <div className="w-full flex justify-between">
//             <div className="flex justify-center items-center gap-2">
//               <div className="text-xl text-red-400 p-1 rounded-md base-shadow">
//                 <SiGmail />
//               </div>
//               <p className="font-semibold">Gmail Users</p>
//             </div>
//             <div className="flex items-center justify-center text-xl">
//               <ToolTipDisplyInfo description={"Total Number of Gmail Users"} />
//             </div>
//           </div>
//           <div className="mt-3 w-full flex justify-between items-center">
//             <div>
//               <p className="text-3xl font-bold">
//                 <CountUpCustome value={total_Gmail_Users} duration={3} />
//               </p>
//               <p className="text-[12px]">since 2025</p>
//             </div>
//             <div>
//               <div
//                 className={`text-5xl ${
//                   total_Google_Users < total_Gmail_Users
//                     ? "text-green-400"
//                     : "text-red-400"
//                 }`}
//               >
//                 {total_Google_Users < total_Gmail_Users ? (
//                   <HiOutlineArrowTrendingUp />
//                 ) : (
//                   <HiOutlineArrowTrendingDown />
//                 )}
//               </div>
//               <p
//                 className={`${
//                   gmail_Percent.includes("-")
//                     ? "text-red-500"
//                     : "text-green-500"
//                 }`}
//               >
//                 {total_Gmail_Users === 0 ? "loading" : gmail_Percent + "%"}
//               </p>
//             </div>
//           </div>
//           <p className="text-md">Details</p>
//         </div>

//         {/* Removed Users */}
//         <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
//           <div className="w-full flex justify-between">
//             <div className="flex justify-center items-center gap-2">
//               <div className="text-xl text-red-600 p-1 rounded-md base-shadow">
//                 <MdGroupRemove />
//               </div>
//               <p className="font-semibold">Removed Users</p>
//             </div>
//             <div className="flex items-center justify-center text-xl">
//               <ToolTipDisplyInfo
//                 description={"Total Number of Removed Users"}
//               />
//             </div>
//           </div>
//           <div className="mt-3 py-2 w-full flex justify-between items-center">
//             <div>
//               <p className="text-3xl font-bold">
//                 <CountUpCustome value={0} duration={3} />
//               </p>
//               <p className="text-[12px]">since 2025</p>
//             </div>
//             <div>
//               <div className="text-md text-black dark:text-white">Neutral</div>
//               <p className="">00</p>
//             </div>
//           </div>
//           <p className="text-md">Details</p>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="mt-2 p-1">
//         <div className="mx-auto flex justify-center items-center md:items-start flex-col md:flex-row gap-4">
//           <div className="flex flex-col md:max-w-[50%] gap-2 p-3 dark:shadow-[0px_0px_5px_0px_#cbd5e0] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl">
//             <p className="text-3xl font-bold">Visual Preview</p>
//             <div className="text-sm">
//               See all the details in{" "}
//               <span className="font-bold text-pink-500">Doughnut Chart</span> in
//               understandable format
//             </div>
//             <p className="font-semibold text-green-400">All the data</p>

//             <div className="max-w-[70%] mx-auto">
//               <div className="flex gap-1">
//                 <div className="rounded-full bg-black text-white text-xl w-[24px] flex items-center justify-center">
//                   <PiUsersThreeLight />
//                 </div>
//                 <p className="font-semibold text-sm">Total Users</p>
//               </div>
//               <div className="flex gap-1">
//                 <div className="rounded-full text-white text-xl w-[25px] flex items-center justify-center">
//                   <FcGoogle />
//                 </div>
//                 <p className="font-semibold text-sm">Google Users</p>
//               </div>
//               <div className="flex gap-1">
//                 <div className="rounded-sm text-red-400 text-xl w-[25px] flex items-center justify-center">
//                   <SiGmail />
//                 </div>
//                 <p className="font-semibold text-sm">Gmail Users</p>
//               </div>
//             </div>
//           </div>

//           <div className="md:max-w-[50%]">
//             <DoughnutChart
//               totalUsersData={totalUsersData?.length || 0}
//               total_Google_Users={total_Google_Users}
//               total_Gmail_Users={total_Gmail_Users}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineArrowTrendingDown, HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { MdGroupRemove } from "react-icons/md";
import { PiUsersThreeLight } from "react-icons/pi";
import { SiGmail } from "react-icons/si";
import { CountUpCustome } from "../components/CountUpCustome";
import DoughnutChart from "../components/DoughnutChart";
import { ToolTipDisplyInfo } from "../components/ToolTipDisplyInfo";

// **Alag fetch function jaise pehle tha**
export async function getDashboardUsersData() {
  // const token = await axios.get("/api/getToken"); // Token fetch
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_Backend_URL}/get/dashboard_data`, {
    withCredentials:true
  });
  return data;
}

export const DashboardDesign = ({ authData }: { authData: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard_users_data"],
    queryFn: getDashboardUsersData,
    staleTime: 1000 * 60 * 10,
  });

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalGoogleUsers, setTotalGoogleUsers] = useState(0);
  const [totalGmailUsers, setTotalGmailUsers] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);

  useEffect(() => {
    if (data) {
      setTotalUsers(data.totalUsers);
      setTotalGoogleUsers(data.totalGoogleUsers);
      setTotalGmailUsers(data.totalGmailUsers);
      setTotalAdmins(data.totalAdmins);
    }
  }, [data]);

  const googlePercent =
    totalGmailUsers > 0 ? (((totalGoogleUsers - totalGmailUsers) / totalGmailUsers) * 100).toFixed(2) : "0";
  const gmailPercent =
    totalGoogleUsers > 0 ? (((totalGmailUsers - totalGoogleUsers) / totalGoogleUsers) * 100).toFixed(2) : "0";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500 text-center mt-10">Failed to load data</div>;
  }

  return (
    <section className="h-full w-full relative overflow-x-hidden">
      {/* Welcome Section */}
      <div className="p-2 mt-3 mb-1 lg:px-3">
        <p className="text-4xl font-bold">Welcome Back !</p>
        <p className="text-lg">{authData}</p>
        <p className="mt-3 text-slate-500">Start Managing Things...</p>
      </div>
      <hr className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]" />

      {/* Cards Section */}
      <div className="relative w-full mt-3 overflow-x-hidden p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {/* Total Users */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <div className="text-xl bg-black p-1 text-white rounded-full"><PiUsersThreeLight /></div>
              <p className="font-semibold">Total Users</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo description={"Total Number of Users"} />
            </div>
          </div>
          <div className="mt-3 py-2 w-full flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold"><CountUpCustome value={totalUsers} duration={3} /></p>
              <p className="text-[12px]">since 2025</p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        {/* Google Users */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <div className="text-xl p-1 rounded-md base-shadow"><FcGoogle /></div>
              <p className="font-semibold">Google Users</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo description={"Total Number of Google Users"} />
            </div>
          </div>
          <div className="mt-3 w-full flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold"><CountUpCustome value={totalGoogleUsers} duration={3} /></p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div>
              <div className={`text-5xl ${totalGoogleUsers > totalGmailUsers ? "text-green-400" : "text-red-400"}`}>
                {totalGoogleUsers > totalGmailUsers ? <HiOutlineArrowTrendingUp /> : <HiOutlineArrowTrendingDown />}
              </div>
              <p className={`${googlePercent.includes("-") ? "text-red-500" : "text-green-500"}`}>
                {totalGoogleUsers === 0 ? "loading" : googlePercent + "%"}
              </p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        {/* Gmail Users */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <div className="text-xl text-red-400 p-1 rounded-md base-shadow"><SiGmail /></div>
              <p className="font-semibold">Gmail Users</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo description={"Total Number of Gmail Users"} />
            </div>
          </div>
          <div className="mt-3 w-full flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold"><CountUpCustome value={totalGmailUsers} duration={3} /></p>
              <p className="text-[12px]">since 2025</p>
            </div>
            <div>
              <div className={`text-5xl ${totalGoogleUsers < totalGmailUsers ? "text-green-400" : "text-red-400"}`}>
                {totalGoogleUsers < totalGmailUsers ? <HiOutlineArrowTrendingUp /> : <HiOutlineArrowTrendingDown />}
              </div>
              <p className={`${gmailPercent.includes("-") ? "text-red-500" : "text-green-500"}`}>
                {totalGmailUsers === 0 ? "loading" : gmailPercent + "%"}
              </p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>

        {/* Admins */}
        <div className="rounded-xl px-5 py-5 base-shadow dark:shadow-[0px_0px_5px_0px_#cbd5e0]">
          <div className="w-full flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <div className="text-xl text-red-600 p-1 rounded-md base-shadow"><MdGroupRemove /></div>
              <p className="font-semibold">Admins</p>
            </div>
            <div className="flex items-center justify-center text-xl">
              <ToolTipDisplyInfo description={"Total Number of Admins"} />
            </div>
          </div>
          <div className="mt-3 py-2 w-full flex justify-between items-center">
            <div>
              <p className="text-3xl font-bold"><CountUpCustome value={totalAdmins} duration={3} /></p>
              <p className="text-[12px]">since 2025</p>
            </div>
          </div>
          <p className="text-md">Details</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="mt-2 p-1">
        <div className="mx-auto flex justify-center items-center md:items-start flex-col md:flex-row gap-4">
          <div className="flex flex-col md:max-w-[50%] gap-2 p-3 dark:shadow-[0px_0px_5px_0px_#cbd5e0] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl">
            <p className="text-3xl font-bold">Visual Preview</p>
            <div className="text-sm">
              See all the details in <span className="font-bold text-pink-500">Doughnut Chart</span> in understandable format
            </div>
            <p className="font-semibold text-green-400">All the data</p>

            <div className="max-w-[70%] mx-auto">
              <div className="flex gap-1">
                <div className="rounded-full bg-black text-white text-xl w-[24px] flex items-center justify-center"><PiUsersThreeLight /></div>
                <p className="font-semibold text-sm">Total Users</p>
              </div>
              <div className="flex gap-1">
                <div className="rounded-full text-white text-xl w-[25px] flex items-center justify-center"><FcGoogle /></div>
                <p className="font-semibold text-sm">Google Users</p>
              </div>
              <div className="flex gap-1">
                <div className="rounded-sm text-red-400 text-xl w-[25px] flex items-center justify-center"><SiGmail /></div>
                <p className="font-semibold text-sm">Gmail Users</p>
              </div>
              <div className="flex gap-1">
                <div className="rounded-sm text-red-600 text-xl w-[25px] flex items-center justify-center"><MdGroupRemove /></div>
                <p className="font-semibold text-sm">Admins</p>
              </div>
            </div>
          </div>

          <div className="md:max-w-[50%]">
            <DoughnutChart
              totalUsersData={totalUsers}
              total_Google_Users={totalGoogleUsers}
              total_Gmail_Users={totalGmailUsers}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
