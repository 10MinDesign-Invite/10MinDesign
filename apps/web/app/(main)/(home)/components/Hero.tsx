"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FaArrowTrendUp, FaPeopleRoof } from "react-icons/fa6";
import { GiFireSilhouette, GiFireworkRocket } from "react-icons/gi";
import { IoIosRose } from "react-icons/io";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineStarRate } from "react-icons/md";
import { useMediaQuery } from "../../../Hooks/useMediaQuery";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const category = [
    {
      text: "Birthday",
      icon: <LiaBirthdayCakeSolid />,
      color: "text-amber-900 dark:text-pink-300",
    },
    { text: "Wedding", icon: <IoIosRose />, color: "text-red-500" },
    { text: "Opening", icon: <FaPeopleRoof />, color: "text-blue-400" },
    {
      text: "Festivals",
      icon: <GiFireworkRocket />,
      color: "text-green-600 dark:text-green-300",
    },
    { text: "Rip", icon: <GiFireSilhouette />, color: "text-orange-400" },
  ];

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const items = isDesktop
    ? [...category, ...category, ...category, ...category]
    : [...category, ...category];

  useGSAP(() => {
    let mm = gsap.matchMedia();
    mm.add("(max-width: 768px)", () => {
      gsap.set("#five-min-design", {
        transform: "scale(0)",
        opacity: 0,
      });
      gsap.set("#heading", {
        x: 90,
        y: 90,
        opacity: 0,
      });
      gsap.set("#description", {
        y: 50,
        opacity: 0,
      });
      gsap.set("#box", {
        opacity: 0,
      });
      gsap.set("#explore-btn", {
        opacity: 0,
      });

      gsap.fromTo(
        "#explore-btn",
        { x: -30, delay: 5, opacity: 0, duration: 1 },
        { x: 0, delay: 5, opacity: 1, duration: 1 },
      );
      gsap.to("#box", {
        delay: 2,
        opacity: 1,
      });

      gsap.to("#description", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 3,
      });
      gsap.to("#five-min-design", {
        scale: 1,
        transformOrigin: "center",
        duration: 1,
        opacity: 1,
        force3D: true,
      });

      gsap.to("#heading", {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.6,
        stagger: 1,
        ease: "bounce",
      });
    });
    mm.add("(min-width: 769px)", () => {
      gsap.set("#five-min-design", {
        transform: "scale(0)",
        opacity: 0,
      });
      gsap.set("#heading", {
        x: 90,
        y: 90,
        opacity: 0,
      });
      gsap.set("#description", {
        y: 50,
        opacity: 0,
      });
      gsap.set("#box", {
        opacity: 0,
      });
      gsap.set("#explore-btn", {
        opacity: 0,
      });

      gsap.fromTo(
        "#explore-btn",
        { x: -30, delay: 5, opacity: 0, duration: 1 },
        { x: 0, delay: 5, opacity: 1, duration: 1 },
      );
      gsap.to("#box", {
        delay: 2,
        opacity: 1,
      });

      gsap.to("#description", {
        y: 0,
        opacity: 1,
        duration: 1.5,
        delay: 3,
      });
      gsap.to("#five-min-design", {
        scale: 1,
        transformOrigin: "center",
        duration: 1,
        opacity: 1,
        delay: 1,
        force3D: true,
      });

      gsap.to("#heading", {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 1,
        delay: 2,
        ease: "bounce",
      });
    });
    mm.add("(min-width: 127px) and (max-width: 767px)", () => {
      gsap.fromTo(
        "#card-one",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 2 },
      );
    });
    mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
      gsap.fromTo(
        "#card-one",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 2 },
      );
      gsap.fromTo(
        "#card-two",
        { y: 200, opacity: 0 },
        { y: 0, opacity: 1, duration: 2 },
      );
    });
    mm.add("(min-width: 1280px)", () => {
      gsap.fromTo(
        "#card-one",
        { y: 600, opacity: 0, delay: 1.8 },
        { y: 0, opacity: 1, duration: 2, delay: 1.8 },
      );
      gsap.fromTo(
        "#card-two",
        { y: -600, opacity: 0, delay: 1.8 },
        { y: 0, opacity: 1, duration: 2, delay: 1.8 },
      );
      gsap.fromTo(
        "#home-images-main-div",
        { x: -40, opacity: 0, delay: 1 },
        { x: 0, opacity: 1, duration: 2, delay: 1 },
      );
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.set("#scroll-animation", {
        opacity: 0,
        scaleX: 0,
      });

      gsap.to("#scroll-animation", {
        opacity: 1,
        duration: 1,
        scale: 1,
        transformOrigin: "center",
        scrollTrigger: {
          trigger: "#scroll-animation",
          scroller: "body",
          start: "top 80%",
          end: "top 10%",
        },
      });
    });
    mm.add("(min-width: 1024px)", () => {
      gsap.set("#scroll-animation", {
        opacity: 0,
        scaleX: 0,
      });
      gsap.to("#scroll-animation", {
        opacity: 1,
        duration: 2,
        scale: 1,
        transformOrigin: "center",
        delay: 5,
      });
    });
  }, []);

  return (
    <main className="p-2">
      <section className=" borde grid grid-cols-1 lg:mt-4 xl:grid-cols-2">
        <div className="borde pt-5 lg:pt-[10px] p-1 lg:mt-9">
          {/* 5 nin design */}
          <div
            style={{ fontFamily: "MyFont" }}
            id="five-min-design"
            className="opacity-0 w-[130px] py-[2px] text-black bg-green-300 flex justify-center items-center gap-1 rounded-xl mb-7"
          >
            <MdOutlineStarRate className="text-xl" />
            <p className="text-sm italic">10 Min Design</p>
          </div>

          {/* heading */}
          <div className={`w-full borde mt-2 overflow-hidden`}>
            <div className="grid gap-1 pl-1 hero-headings">
              <h1
                id="heading"
                className={`opacity-0 text-[42px] md:text-[60px] lmd:text-[65px]`}
              >
                We{" "}
                <span
                  id="fontbold"
                  className={`inline-block transition-all duration-300 hover:scale-x-105`}
                >
                  Help
                </span>{" "}
                People
              </h1>
              <h2
                id="heading"
                className={`opacity-0 text-[42px] md:text-[60px] lmd:text-[65px] `}
              >
                Invite Their
              </h2>
              <h3
                id="heading"
                className={`opacity-0 text-[42px] md:text-[60px] lmd:text-[65px] bg-gradient-to-r from-green-400 to-sky-500 bg-clip-text text-transparent`}
              >
                <span
                  className={`inline-block transition-all duration-300 hover:scale-x-105 bg-gradient-to-r from-green-400 to-sky-500 bg-clip-text text-transparent`}
                >
                  Friends
                </span>{" "}
                And{" "}
                <span
                  className={`inline-block transition-all duration-300 hover:scale-x-105 bg-gradient-to-r from-green-400 to-sky-500 bg-clip-text text-transparent`}
                >
                  Family
                </span>
              </h3>
            </div>
          </div>

          {/* description */}
          <div id="description" className="p-2 mt-1 opacity-0">
            <div className="font-light md:tracking-wide text-[15px] sm:text-md">
              Beautiful invites in just 5 minutes. Perfect for any
              celebration.zero hassle
            </div>
          </div>

          {/* explore more */}
          <div className="flex gap-3 ">
            <div id="box" className="mt-3 opacity-0">
              <div className="text-xl font-bold opacity-0">Explore More</div>
              <div className="p-1 w-[90px] bg-green-500 rounded-lg"></div>
            </div>
            <Link
              href={"/explore"}
              id="explore-btn"
              className="opacity-0 w-[50px] bg-black text-white dark:bg-white dark:text-black mt-3 rounded-md flex justify-center items-center text-2xl"
            >
              <FaArrowTrendUp />
            </Link>
          </div>
        </div>

        {/* card section */}
        <div
          id="home-images-main-div"
          className="w-[98%] sm:w-[400px] md:w-[90%] mx-auto p-2 xl:opacity-0 grid md:grid-cols-2 lg:mt-[122px] gap-2 mt-[100px] xl:mt-4 rounded-3xl overflow-hidden shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]"
        >
          <div
            id="card-one"
            className="home-images-div borde opacity-0 lg:opacity-100 xl:opacity-0 h-[450px] overflow-scroll p-2 grid gap-5 md:pt-[25px] lg:pt-[30px] lg:mt-[50px] scrollbar-hide rounded-2xl "
          >
            <Link href={`/explore`}>
              <Image
              className="borde p-2 xl:p-1 w-[330px] sm:w-[80%] h-[450px] md:w-[90%] md:h-[400px] lmd:w-[330px] lmd:h-[440px] xl:w-[95%] xl:h-[392px] mx-auto text-center text-5xl"
              src={"/firstinvitation.webp"}
              alt="invitation card image"
              width={250}
              height={300}
            />
            <Image
              className="borde p-2 xl:p-1 w-[330px] sm:w-[80%] h-[450px] md:w-[90%] md:h-[400px] lmd:w-[330px] lmd:h-[440px] xl:w-[95%] xl:h-[392px] mx-auto text-center text-5xl"
              src={"/firstwedding.webp"}
              alt="wedding card image"
              width={250}
              height={300}
            />
            </Link>
          </div>

          <div
            id="card-two"
            className="home-images-div h-[450px] opacity-0 lg:opacity-100 xl:opacity-0 overflow-scroll hidden p-2 md:grid gap-5 scrollbar-hide rounded-2xl md:pt-[15px]"
          >
            <Link href={`/explore`}>
              <Image
              className="borde p-2 xl:p-1 mt-3 w-[90%] mx-auto h-[400px] lmd:w-[320px] lmd:h-[431px] xl:w-[95%] xl:h-[394px] text-center text-5xl"
              src={"/firstwedding.webp"}
              alt="wedding card image"
              width={250}
              height={300}
            />
            <Image
              className="borde p-2 xl:p-1 w-[80%] h-[450px] md:w-[90%] md:h-[400px] lmd:w-[330px] lmd:h-[440px] xl:w-[95%] xl:h-[392px] mx-auto text-center text-5xl"
              src={"/firstinvitation.webp"}
              alt="invitation card image"
              width={250}
              height={300}
            />
            </Link>
          </div>
        </div>
      </section>

      {/* scroller */}
      <section className="borde lg:pt-11 lg:mt-[90px]">
        <div
          id="scroll-animation"
          className="overflow-hidden flex mt-6 opacity-0"
        >
          <ul
            className={`flex py-3 gap-10 ${isDesktop ? "animate-infinite-scroll2" : "animate-infinite-scroll"}`}
          >
            {items.map((cat, index) => (
              <li
                key={index}
                className="text-xl flex gap-2 sm:gap-3 md:gap-4 justify-center items-center whitespace-nowrap"
              >
                {cat.text}
                <p className={cat.color}>{cat.icon}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
