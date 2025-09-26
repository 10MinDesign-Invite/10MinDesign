import { authClient } from "@repo/better-auth/authClient";
import { Structure } from "./components/Structure";

export default async function Home() {

  return (
    <div className="max-w-[1440px] mx-auto mt-[80px] overflow-x-hidden">
      <Structure/>
    </div>
  );
}
