import { Image } from "@imagekit/next";
import { DesignContainer } from "../../category-components/DesignContainer";
import { DesignWraper } from "../../category-components/DesignWraper";
import { DetailWrapper } from "../../category-components/DetailWrapper";
import { useRef } from "react";
import { handleDownload } from "@/app/(templates)/utils/handelDwonload";

export function Wedding1(){
    const containerRef = useRef(null);
 
    
    
    return(
       <DesignWraper customeStyles="flex flex-col lg:flex-row items-center">
            <DetailWrapper customeStyles="w-full border border-black ">
                <button onClick={()=>handleDownload(containerRef)}> dwonload</button>
            </DetailWrapper>

            <DesignContainer customeStyles="w-[80%]">

                <div ref={containerRef} className="border border-white relative w-full md:h-[auto] mx-auto flex justify-center items-center">
                {/* top most section */}
                    <div className="absolute border border-black top-[0%] left-[0%] w-[8%] h-[8.5%] skew-[40]">
                        <Image
                        src="/first_wedding_bells.png"
                        width={800}
                        height={500}
                        alt={"main image"}
                    />
                    </div>
                    <div className="absolute border border-black top-[0%] right-[0%] w-[8%] h-[8.5%] rotate-[360deg] bg-white">
                        <Image
                        src="/first_wedding_bells.png"
                        width={800}
                        height={500}
                        alt={"main image"}
                    />
                    </div>
                    <Image
                        src="/firstwedding.jpg"
                        width={800}
                        height={500}
                        alt={"main image"}
                    />
                    
                    <p className="absolute border border-black top-[0%] left-[20%] w-[30%] h-[2.5%] text-[1.8vw] flex justify-center items-center bg-white">
                        || {"shree ganesh"} ||
                    </p>
                    <div className="absolute outline outline-black top-[3%] left-[28.4%] w-[12.9%] h-[8.9%] overflow-hidden">
                        <Image
                            src="/first_wedding_ganpati.png"
                            style={{width:"100%", height:"100%"}}
                            alt="ganpati"
                            width={100}
                            height={100}
                            priority={true}
                        />
                    </div>
                    
                    <div className="border border-black absolute top-[3%] left-[45.5%] w-[29.5%] h-[4.5%] flex justify-start items-center font-bold text-[3vw]">
                        rushikesh
                    </div>
                    <div className="border border-black absolute top-[8%] left-[50.5%] w-[29.5%] h-[4.5%] flex justify-start items-center font-bold text-[3vw]">
                        rushikesh
                    </div>

                {/* ================================================================================= */}

                </div>

            </DesignContainer>
       </DesignWraper>
    )
}