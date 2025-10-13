type DesignWrapperProps = {
  children: React.ReactNode;
  customeStyles?: string | undefined;
};
export function DesignWraper({ children, customeStyles }: DesignWrapperProps) {
  return (
    <div
      className={`w-full ${!customeStyles ? "flex flex-col md:flex-row items-center md:items-start justify-center" : customeStyles}  gap-3  p-1`}
    >
      {children}
    </div>
  );
}
