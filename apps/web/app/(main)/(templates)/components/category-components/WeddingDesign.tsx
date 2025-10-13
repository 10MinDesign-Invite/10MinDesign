import { Image } from "@imagekit/next";
import { Dispatch, SetStateAction } from "react";
interface propType {
  setCurrentDesign: Dispatch<
    SetStateAction<{ wedding: string; image: string }>
  >;
  currentDesign: { wedding: string; image: string };
}
export function WeddingDesign({ setCurrentDesign, currentDesign }: propType) {
  return (
    <div className="">
      <div
        onClick={() => setCurrentDesign({ wedding: "", image: "" })}
        className="absolute bg-black dark:bg-white dark:text-red-600 top-[5px] right-[20px] cursor-pointer px-3 text-xl font-bold rounded-xl"
      >
        X
      </div>
      <div className=" mt-10 sm:mt-0 flex justify-center items-center">
        {currentDesign.image && (
          <Image
            src={`${currentDesign.image}`}
            width={500}
            height={500}
            alt="Design preview"
            loading="lazy"
            // className=" md:h-[700px]"
            style={{ width: "auto", height: "auto" }}
          />
        )}
      </div>
    </div>
  );
}
