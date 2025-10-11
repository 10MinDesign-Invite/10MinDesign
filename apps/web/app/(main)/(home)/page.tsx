import { Structure } from "./components/Structure";
import { getSession } from "../../action/getSession";
import { AuthData } from "@/app/types/custome-types";
import { cookies, headers } from "next/headers";
import {auth} from "@repo/database/auth"
import { authClient } from "@repo/database/authClient";

export default async function Home() {
  // const authData: AuthData | null = await getSession(); 

  return (
    <div className="max-w-[1440px] mx-auto mt-[80px] overflow-x-hidden">
      {/* <Structure authData={authData} /> */}
      <Structure />
    </div>
  );
}
