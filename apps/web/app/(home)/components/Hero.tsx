"use client"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FaArrowTrendUp, FaPeopleRoof } from "react-icons/fa6";
import { GiFireSilhouette, GiFireworkRocket } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineStarRate } from "react-icons/md";
import { mainheading } from "../../fonts/fonts-config";
import { useMediaQuery } from "../../Hooks/useMediaQuery";
gsap.registerPlugin(ScrollTrigger)

export function Hero() {
    
    const category = [
        { text: "Birthday", icon: < LiaBirthdayCakeSolid />, color: "text-amber-900 dark:text-pink-300" },
        { text: "wedding", icon: <IoIosRose />, color: "text-red-500" },
        { text: "opening", icon: <FaPeopleRoof />, color: "text-blue-400" },
        { text: "festivals", icon: <GiFireworkRocket />, color: "text-green-600 dark:text-green-300" },
        { text: "Rip", icon: <GiFireSilhouette />, color: "text-orange-400" }
    ]

    const isDesktop = useMediaQuery("(min-width: 768px)");

    const items = isDesktop
        ? [...category, ...category, ...category, ...category]
        : [...category, ...category];

    useGSAP(() => {

        let mm = gsap.matchMedia();
        mm.add("(max-width: 768px)", () => {
            gsap.set("#five-min-design", {
                transform: "scale(0)",
                opacity: 0
            })
            gsap.set("#heading", {
                x: 90,
                y: 90,
                opacity: 0,
            })
            gsap.set("#description", {
                y: 50,
                opacity: 0
            })
            gsap.set("#box", {
                opacity: 0,
            })
            gsap.set("#explore-btn", {
                opacity: 0,
            })
           
            gsap.fromTo("#explore-btn",
                { x: -30, delay: 5, opacity: 0, duration: 1 },
                { x: 0, delay: 5, opacity: 1, duration: 1 }
            )
            gsap.to("#box", {
                delay: 2,
                opacity: 1,
            })

            gsap.to("#description", {
                y: 0,
                opacity: 1,
                duration: 1.5,
                delay: 3
            })
            gsap.to("#five-min-design", {
                scale: 1,
                transformOrigin: "center",
                duration: 1,
                opacity: 1,
                force3D: true
            })

            gsap.to("#heading", {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 1.6,
                stagger: 1,
                ease: "bounce",
            })

        });
        mm.add("(min-width: 769px)", () => {
            gsap.set("#five-min-design", {
                transform: "scale(0)",
                opacity: 0
            })
            gsap.set("#heading", {
                x: 90,
                y: 90,
                opacity: 0,
            })
            gsap.set("#description", {
                y: 50,
                opacity: 0
            })
            gsap.set("#box", {
                opacity: 0,
            })
            gsap.set("#explore-btn", {
                opacity: 0,
            })
           
            gsap.fromTo("#explore-btn",
                { x: -30, delay: 5, opacity: 0, duration: 1 },
                { x: 0, delay: 5, opacity: 1, duration: 1 }
            )
            gsap.to("#box", {
                delay: 2,
                opacity: 1,
            })

            gsap.to("#description", {
                y: 0,
                opacity: 1,
                duration: 1.5,
                delay: 3
            })
            gsap.to("#five-min-design", {
                scale: 1,
                transformOrigin: "center",
                duration: 1,
                opacity: 1,
                delay: 1,
                force3D: true
            })

            gsap.to("#heading", {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 1.5,
                stagger: 1,
                delay: 2,
                ease: "bounce",
            })

        });

        mm.add("(max-width: 1023px)",()=>{
            gsap.set("#scroll-animation", {
                opacity: 0,
                scaleX: 0
            })
    
            gsap.to("#scroll-animation", {
                opacity: 1,
                duration: 1,
                scale: 1,
                transformOrigin: "center",
                scrollTrigger:{
                    trigger:"#scroll-animation",
                        scroller:"body",
                        start:"top 80%",
                        end:"top 10%",
                    
                }
    
            })
        })
        mm.add("(min-width: 1024px)",()=>{
            gsap.set("#scroll-animation", {
                opacity: 0,
                scaleX: 0
            })
            gsap.to("#scroll-animation", {
                opacity: 1,
                duration: 2,
                scale: 1,
                transformOrigin: "center",
                delay: 5
    
            })
        })

    }, [])

    return (
        <main className="p-2">
            <section className="borde grid grid-cols-1 lg:grid-cols-2">
                <div className="borde pt-5 lg:pt-[10px] p-1 lg:mt-9">
                    {/* 5 nin design */}
                    <div id="five-min-design" className="opacity-0 w-[130px] py-[2px] text-black bg-green-300 flex justify-center items-center gap-1 rounded-xl mb-7">
                        <MdOutlineStarRate className="text-xl" />
                        <p className="text-sm italic">10 Min Design</p>
                    </div>

                    {/* heading */}
                    <div className={`w-full borde mt-2 ${mainheading.className} overflow-hidden`}>
                        <div className="grid gap-1 pl-1">
                            <h1 id="heading" className={`opacity-0 text-[42px] md:text-[49px] lmd:text-[53px]`}>We <span id="fontbold" className={`inline-block transition-all duration-300 hover:scale-x-105`}>Help</span> People</h1>
                            <h2 id="heading" className={`opacity-0 text-[42px] md:text-[49px] lmd:text-[53px] ${mainheading.className}`}>Invite Their</h2>
                            <h3 id="heading" className={`opacity-0 text-[42px] md:text-[49px] lmd:text-[53px] bg-gradient-to-r from-green-400 to-sky-500 bg-clip-text text-transparent ${mainheading.className}`}><span className={`inline-block transition-all duration-300 hover:scale-x-105 bg-gradient-to-r from-green-400 to-sky-500 bg-clip-text text-transparent`}>Friends</span> And <span className={`inline-block transition-all duration-300 hover:scale-x-105 bg-gradient-to-r from-green-400 to-sky-500 bg-clip-text text-transparent`}>Family</span></h3>
                        </div>
                    </div>

                    {/* description */}
                    <div id="description" className="p-2 mt-1 opacity-0">
                        <div className="font-light md:tracking-wide text-[15px] sm:text-md">
                            Beautiful invites in just 5 minutes.
                            Perfect for any celebration.zero hassle
                        </div>
                    </div>

                    {/* explore more */}
                    <div className="flex gap-3 ">
                        <div id="box" className="mt-3 opacity-0">
                            <div className="text-xl font-bold opacity-0">Explore More</div>
                            <div className="p-1 w-[90px] bg-green-500 rounded-lg"></div>
                        </div>
                        <Link href={"/"} id="explore-btn" className="opacity-0 w-[50px] bg-black text-white dark:bg-white dark:text-black mt-3 rounded-md flex justify-center items-center text-2xl">
                            <FaArrowTrendUp />
                        </Link>
                    </div>

                </div>

                {/* card section */}
                <div className="p-2 borde grid md:grid-cols-2 gap-2 mt-5">


                    <div className="borde h-[400px] overflow-scroll p-2 grid gap-5 lg:pt-[50px] scrollbar-hide">
                        <div className="borde p-2 h-[300px] text-center text-5xl">wedding</div>
                        <div className="borde p-2 h-[300px] text-center text-5xl">Birthday</div>

                    </div>

                    <div className=" h-[400px] overflow-scroll hidden p-2 md:grid gap-5 scrollbar-hide ">
                        <div className="p-2 h-[300px] text-center text-5xl">wedding</div>
                        <div className="p-2 h-[300px] text-center text-5xl">Birthday</div>

                    </div>

                </div>
            </section>


            {/* scroller */}
            <section className="borde lg:pt-11 lg:mt-[90px]">
                <div id="scroll-animation" className="overflow-hidden flex mt-6 opacity-0">
                    <ul className={`flex py-3 gap-10 ${isDesktop ? "animate-infinite-scroll2" : "animate-infinite-scroll"}`}>
                        {items.map((cat, index) => (
                            <li key={index} className="text-xl flex gap-2 sm:gap-3 md:gap-4 justify-center items-center whitespace-nowrap">
                                {cat.text}
                                <p className={cat.color}>{cat.icon}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

        </main>
    )
}


