"use client"

interface DesignContainerProps{
    children:React.ReactNode
}

export function DesignContainer({children}:DesignContainerProps){
    return(
        <div className="w-full md:w-[50%] h-[600px] text-center overflow-y-scroll scrollbar-hide flex justify-center items-start">
            {children}
        </div>
    )
}