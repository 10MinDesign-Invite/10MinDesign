import { authClient } from "@repo/auth/authClient";
import { Structure } from "./components/Structure";
import { headers } from "next/headers";


export default async function Home() {
    const session = await authClient.getSession({
      fetchOptions:{
        headers: await headers()
      }
    })
  return (
    <div className="max-w-[1440px] mx-auto mt-[80px] overflow-x-hidden">
      <Structure session={session.data}/>
    </div>
  );
}


