"use client";

import { Opening1 } from "@/app/(main)/(templates)/components/category-design/opening/Opening1";
import { Opening2 } from "@/app/(main)/(templates)/components/category-design/opening/Opening2";
import { notFound, useParams } from "next/navigation";

const designComponentMap: Record<string, React.ComponentType<any>> = {
  Opening1,
  Opening2,
};

export default function DesignsPage() {
  const params = useParams();
  let slug = params.design?.[0];
  const Component = designComponentMap[slug!];
  if (!Component) return notFound();
  return (
    <div className="max-w-[1440px] mx-auto mt-[80px]">
      <Component />
    </div>
  );
}
