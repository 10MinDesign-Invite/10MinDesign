import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardDesign } from "./components/DashboardDesign";
import { QueryProvider } from "./components/QueryProvider";

export default async function Dashboard() {
  const authData = await auth();
  if (authData?.user?.email == null) return redirect("/login");

  return (
    <>
      <QueryProvider>
        <DashboardDesign authData={authData?.user?.name!} />
      </QueryProvider>
    </>
  );
}
