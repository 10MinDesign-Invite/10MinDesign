import { AuthData } from "@repo/zod-input-validation";
import { DashboardDesign } from "./components/DashboardDesign";
import { getSession } from "../action/getSession";

export default async function Dashboard() {
  const authData: AuthData | null = await getSession();
  return (
    <>
      <DashboardDesign authData={authData?.name} />
    </>
  );
}
