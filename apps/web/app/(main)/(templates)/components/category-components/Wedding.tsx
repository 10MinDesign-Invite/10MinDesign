"use client";
import { Image } from "@imagekit/next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
import { CategoryLayout } from "./CategoryLayout";
import { WeddingDesign } from "./WeddingDesign";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { BottomLoader } from "@/components/Bottom_Loader";
import { fetchCards } from "@/app/helpers/fetchCards";

interface WeddingCard {
  id: number;
  componentName: string;
  imageUrl: string;
  price: number;
  width?: number
}

export function Wedding() {
  const [currentDesign, setCurrentDesign] = useState({
    wedding: "",
    image: "",
  });

  const [images, setImages] = useState<WeddingCard[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  async function loadCards(pageNumber: number) {
    if (loading) return;
    setLoading(true);

    const data = await fetchCards(pageNumber,10,"wedding");

    setImages(prev => [...prev, ...data.result]);
    setTotalPages(data.totalPages);

    setLoading(false);
  }

  // first load 10 cards = page1
  useEffect(() => {
    loadCards(1);
    ()=>{
      setImages([])
    }
  }, []);
  // next rest pages 2,3,4,5,7
  useEffect(() => {
    if (inView && !loading && page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadCards(nextPage);
    }
    ()=>{
      setImages([])
    }
  }, [inView]);

  return (
    <div className="max-w-[1440px] mx-auto h-dvh dark:text-white mt-[100px]">
      <CategoryLayout category="Wedding" />
      <div className="pb-9 mt-[30px]  grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 sm:gap-6 md:gap-7 lg:gap-10">
        {images?.map((cur, index) => {
          return (
            <div
              key={cur.componentName}
              className="outline backdrop-blur-xl bg-slate-200 rounded-xl relative mb-4 md:mb-0 overflow-x-hidden"
            >
              <p
                className={`absolute -left-[5px] -top-[3px] ${cur.price == 0 ? "bg-green-400" : "bg-yellow-400"} rounded-br-xl px-4`}
              >
                {cur.price === 0 ? "free" : cur.price}
              </p>
              <div className=" rounded-t-xl flex justify-center">
                <Image
                  src={cur.imageUrl}
                  width={cur.width ? cur.width : 200}
                  height={300}
                  priority={index === 0}
                  alt="Picture of the author"
                  background-repeat="no-repeat"
                  background-size="cover"
                  style={{ height: "300px" }}
                  loading={index === 0 ? undefined : "lazy"}
                />
              </div>
              <div className=" text-white flex flex-col w-[90%] mx-auto h-[85px] pt-1 px-1 mt-1">
                <div className=" flex justify-between w-[90%] h-[40px] mx-auto gap-5">
                  <div className="flex items-center justify-center gap-1 w-[100px] bg-white rounded-xl text-black cursor-pointer">
                    <FaHeart className="text-xl text-red-500" />
                    <p className="">{"123k"}</p>
                  </div>
                  <div
                    onClick={() =>
                      setCurrentDesign({
                        wedding: cur.componentName,
                        image: cur.imageUrl,
                      })
                    }
                    className="flex items-center justify-center w-[100px] bg-white rounded-xl text-black gap-1 cursor-pointer"
                  >
                    <IoMdEye className="text-2xl text-sky-500" />
                    <p className="">{"view"}</p>
                  </div>
                </div>
{/* change this later */}
                <Link
                  className="w-[90%] mx-auto"
                  href={`/category/wedding/Wedding1`}
                >
                  <button className="w-full bg-blue-300 mt-1 text-center text-black p-1 rounded-xl">
                    Design
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className={`${currentDesign.wedding == "" ? "hidden" : "block"} inset-0 overflow-auto fixed top-0 left-0 w-full h-[100%] backdrop-blur-2xl text-white z-50`}
      >
        <WeddingDesign
          setCurrentDesign={setCurrentDesign}
          currentDesign={currentDesign}
        />
      </div>

            <div className="bg-whit p-3" ref={ref}>
                {
                    loading && <BottomLoader/>
                }
            </div>
        
    </div>
  );
}
