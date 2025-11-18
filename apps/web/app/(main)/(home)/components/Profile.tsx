"use client";
import { mainheading } from "@/app/fonts/fonts-config";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { lazy, Suspense, useState } from "react";
import { RiLogoutCircleLine } from "react-icons/ri";
import { ProfileLoader } from "./ProfileLoader";
const ProfileData = lazy(() => import("./ProfileData"));
export function Profile({ authData }: any) {
  const [profile, setProfile] = useState(false);

  return (
    <div className="">
      <div className="w-10 h-10 rounded-full overflow-hidden relative">
        {authData?.image ? (
          <Image
            onClick={() => setProfile((prev) => !prev)}
            width={40}
            height={40}
            src={authData.image}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div
            onClick={() => setProfile((prev) => !prev)}
            className="bg-gradient-to-r from-blue-200 to-red-500 w-full h-full flex justify-center items-center cursor-pointer"
          >
            <p className="text-xl">{authData?.name?.charAt(0)}</p>
          </div>
        )}
      </div>

      <div className="">
        {profile && (
          <Suspense fallback={<ProfileLoader/>}>
            <ProfileData authData={authData} setProfile={setProfile}/>
          </Suspense>
        )}
      </div>
    </div>
  );
}
