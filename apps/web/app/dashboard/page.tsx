import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardDesign } from "./components/DashboardDesign";

export default async function Dashboard() {
  const authData = await auth();
  if (authData?.user?.email == null) return redirect("/login");

  return (
    <>
        <DashboardDesign authData={authData?.user?.name!} />
    </>
  );
}
