import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { HiOutlineBars3 } from "react-icons/hi2";

export default async function Dashboard(){
  const authdata = await auth();
  if(authdata?.user?.email == null) return redirect("/login");

  return (
    <section className="h-full w-full">
      <div className="p-1 lg:hidden">
        <span className="text-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"><HiOutlineBars3 /></span>
      </div>

      <div className="p-2 mt-3 mb-1 lg:px-3">
          <p className="text-4xl font-bold">
              Welcome Back !
          </p>
          <p className="text-lg">{authdata?.user?.name}</p>
          <p className="mt-3 text-slate-500">Start Managing Things...</p>
      </div>
      <hr/>
    </section>
  )
}



