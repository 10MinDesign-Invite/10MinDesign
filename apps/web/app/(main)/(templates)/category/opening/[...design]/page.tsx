"use client";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import TemplateNotFound from "../../../components/TemplateNotFound";
import { Main_Loader } from "@/components/Main_Loader";



export default function DesignsPage() {
  const params = useParams();
  let slug = params.design?.[0];
   const DynamicComponent = dynamic(() => import(`@/app/(main)/(templates)/components/category-design/opening/${slug}`), {
        ssr: false,
        loading: () => (
            <Main_Loader/>
        ),
   });
  return (
    <div className="max-w-[1440px] mx-auto mt-[80px]">
      {
              <ErrorBoundary errorComponent={()=><TemplateNotFound/>}>
                <DynamicComponent/> 
              </ErrorBoundary>
      }
    </div>
  );
}
