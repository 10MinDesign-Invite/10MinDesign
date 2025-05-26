type DesignWrapperProps = {
  children: React.ReactNode;
};
export function DesignWraper({children}:DesignWrapperProps){

    return(
        <div className="w-full border border-whit  flex flex-col md:flex-row items-center md:items-start justify-center gap-3  p-1">
            {children}
        </div>
    )
}