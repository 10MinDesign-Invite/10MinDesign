import { Structure } from "./components/Structure";
import { getSession } from "../../action/getSession";
import { AuthData } from "@repo/zod-input-validation";
export default async function Home() {
  const authData: AuthData | null = await getSession();

  return (
    <div className="max-w-[1440px] mx-auto mt-[80px] overflow-x-hidden">
      <Structure authData={authData} />
    </div>
  );
}
