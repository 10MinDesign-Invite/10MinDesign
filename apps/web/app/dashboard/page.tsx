import { DashboardDesign } from "./components/DashboardDesign";
import { getSession } from "../action/getSession";
import { AuthData } from "../types/custome-types";

export default async function Dashboard() {
  const authData: AuthData | null = await getSession();
  return (
    <>
      <DashboardDesign authData={authData?.name} />
    </>
  );
}
