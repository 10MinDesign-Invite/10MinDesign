"use client"
import { Wedding1 } from "@/app/(templates)/components/category-design/wedding/Wedding1";
import { notFound, useParams } from "next/navigation";


const designComponentMap: Record<string, React.ComponentType<any>> = {
  Wedding1,
};

export default function DesignsPage() {

  const params = useParams()
  let slug = params.design?.[0];
  const Component = designComponentMap[slug!];
  if (!Component) return notFound();
  return (
    <div className="max-w-[1440px] mx-auto mt-[80px]">
        <Component/>
    </div>
  );
}