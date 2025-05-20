interface DetailProps{
      children: React.ReactNode;
}
export function DetailWrapper({children}:DetailProps){
    return(
        <div className="p-2 rounded-lg w-full md:w-[40%] dark:shadow-[inset_0px_0px_14px_0px_#e53e3e] shadow-[0px_7px_13px_0px_#63b3ed] md:h-[600px] text-center flex justify-cente flex-col">
        {children}        
        </div>
    )
}
