import React from "react";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare, FaTelegramPlane } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoCall, IoLocation } from "react-icons/io5";
import { SiGmail } from "react-icons/si";

export const Footer = () => {
  return (
    <footer className="max-w-[1440px] grid gap-[20px] lg:gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mx-auto mt-[70px] md:mt-6 py-15 px-7 bg-black text-white dark:border-t-[2px] dark:border-white rounded-[10px_10px_0px_0px]">
      <div className="px-2 mt-5">
        <div className="flex flex-col">
          <p className="text-2xl md:text-3xl font-bold">10MinDesign</p>
        </div>
        <p className="mt-5">Design best invitation using 10MinDesign</p>
        <div className="flex items-center mt-5 gap-2">
          <IoLocation className="text-blue-400 text-xl" />
          <p className="">Pune Maharastra India</p>
        </div>
        <div className="flex items-center mt-5 gap-2">
          <SiGmail className="text-red-400 text-xl" />
          <p className="text-sm">10mindesign.invite@gmail.com</p>
        </div>
      </div>

      <div className="px-3 mt-7">
        <div className="">
          <p className="font-bold text-xl">DEVELOPERS</p>
        </div>
        <div className="flex flex-col gap-4 mt-6 px-2">
          <p className="">spi9325</p>
          <p className="">10MinDesign-Invite</p>
        </div>
      </div>

      <div className="px-3 mt-7">
        <p className="text-xl font-bold">OUR SOCIAL</p>
        <div className="mt-7 flex gap-5">
          <span className="p-2 text-3xl">
            <BsLinkedin className="bg-white text-blue-500 rounded-sm" />
          </span>
          <div className="flex flex-col justify-center">
            <p className="text-sm">LinkedIn</p>
            <p className="text-sm">20 jul 2025</p>
          </div>
        </div>
        <div className="mt-7 flex gap-5">
          <span className="p-2  text-3xl">
            <FaInstagramSquare className="text-pink-500 bg-white rounded-md" />
          </span>
          <div className=" flex flex-col justify-center">
            <p className="text-sm">Instagram</p>
            <p className="text-sm">20 jul 2025</p>
          </div>
        </div>
        <div className="mt-7 flex gap-5">
          <span className="p-2 text-3xl">
            <FaSquareXTwitter className="text-black bg-white rounded-md" />
          </span>
          <div className=" flex flex-col justify-center">
            <p className="text-sm">Tweeter</p>
            <p className="text-sm">20 jul 2025</p>
          </div>
        </div>
      </div>

      <div className="px-3 mt-7">
        <p className="text-xl font-bold">UPGRADE</p>
        <div className="mt-7">Upgrade to Primium plan for unlimited access</div>
        <div className="mt-7 flex">
          <button className="bg-blue-500 py-2 px-3 text-md rounded-lg font-semibold">
            See Plans
          </button>
        </div>
      </div>
    </footer>
  );
};
