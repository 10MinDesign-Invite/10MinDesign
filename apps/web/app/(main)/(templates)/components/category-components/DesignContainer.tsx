"use client";

interface DesignContainerProps {
  children: React.ReactNode;
  customeStyles?: string | undefined;
}

export function DesignContainer({
  children,
  customeStyles,
}: DesignContainerProps) {
  return (
    <div
      className={`${!customeStyles ? "w-full md:w-[50%] h-[600px]" : customeStyles} text-center overflow-y-scroll scrollbar-hide flex justify-center items-start`}
    >
      {children}
    </div>
  );
}
