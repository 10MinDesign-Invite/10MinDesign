import { auth } from "@/auth";
import { Structure } from "./components/Structure";
export default async function Home() {
  const session = await auth();
  return (
    <div className="max-w-[1440px] mx-auto mt-[80px] overflow-x-hidden">
      <Structure authData={session?.user} />
    </div>
  );
}
