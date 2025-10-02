import { headers } from "next/headers";
import { DashboardDesign } from "./components/DashboardDesign";
import { authClient } from "@repo/auth/authClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await authClient.getSession({
    fetchOptions:{
      headers: await headers()
    }
})
if(session.data?.user.role === "user"){
  redirect("/signin")
}

  return (
    <>
        <DashboardDesign authData={session.data?.user.name ?? "Admin"} />
    </>
  );
}
