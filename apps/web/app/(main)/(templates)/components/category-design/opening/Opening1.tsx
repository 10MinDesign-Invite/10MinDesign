"use client";
import { Image } from "@imagekit/next";
import NextImage from "next/image";
import { DesignContainer } from "../../category-components/DesignContainer";
import { DesignWraper } from "../../category-components/DesignWraper";
import { DetailWrapper } from "../../category-components/DetailWrapper";
import { amita, palanquinDark, sura, yatraOne } from "@/app/fonts/fonts-config";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { GiBowTieRibbon } from "react-icons/gi";
import { IoIosStarHalf } from "react-icons/io";
import { toPng } from "html-to-image";
import { CiCircleInfo } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/app/Hooks/usePayment";
import { usePurchesedTemplate } from "@/app/Hooks/usePurchasedTemplate";
import { toast } from "react-toastify";
import { useClientSession } from "@/app/Hooks/useClientSession";

export default function Opening1() {
  const { pay, isPaid } = usePayment("Opening1","opening")
  const {purchased} = usePurchesedTemplate("Opening1")
  const {session} = useClientSession();
  // above is custome hooks
  const [brandLogo, setBrandLogo] = useState("");
  const [title, setTitle] = useState("मैत्री कट्टा");
  const [service, setServices] = useState("बिर्याणी आणि चायनीज हाऊस.");
  const [date, setDate] = useState("मंगळवार दि 06/05/2024");
  const [time, setTime] = useState("१० वा ३० मि");
  const [opener, setOpener] = useState("मा. सौ. सुप्रिया ताई सुळे");
  const [openerPosition, setOpenerPosition] = useState("खासदार बारामती लोकसभा");
  const [starPerson, setStarPerson] = useState("सौ. आरती शंकर गव्हाणे");
  const [starPosition, setStarPosition] = useState(
    "महिला अध्यक्ष बारामती शहर राष्ट्रवादी काँग्रेस पक्ष शरदचंद्र पवार",
  );
  const [invitor, setInvitor] = useState("तेजस");
  const [location, setLocation] = useState(
    "इंदापूर रोड,ग्रेप चौक,मॅकडोल कंपनी शेजारी,दत्तकृपा उद्योग भवन,पिंपळी.",
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState({ width: false });

  // sizes
  const [wSize, setWsize] = useState<number | null>(null);
  const [hSize, setHsize] = useState<number | null>(null);
  const [titleSize, setTitleSize] = useState<number | null>(null);
  const [serviceSize, setServiceSize] = useState<number | null>(null);

  const wordsArr = title.trim().split(" ");

  const lastWord = wordsArr.length > 1 ? wordsArr[wordsArr.length - 1] : null;
  const otherWords = lastWord ? wordsArr.slice(0, -1) : wordsArr;

  function getLogo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setBrandLogo(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }

  function handelSize(e: React.ChangeEvent<HTMLInputElement>, val: string) {
    if (val == "wSize") {
      const value = e.target.value;
      setWsize(value === "" ? null : Number(value));
    } else {
      if (val == "hSize") {
        const value = e.target.value;
        setHsize(value == "" ? null : Number(value));
      }
    }
  }

  function handelTextSize(e: React.ChangeEvent<HTMLInputElement>, val: string) {
    const value = e.target.value;
    if (val == "titleSize") {
      setTitleSize(value == "" ? null : Number(value));
    }
    if (val == "serviceSize") {
      setServiceSize(value == "" ? null : Number(value));
    }
  }

  const handleDownload = async () => {
    try {
      if (!containerRef.current) return;

      const dataUrl = await toPng(containerRef.current, {
        pixelRatio: 3,
        quality: 5,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "finaldesign.png";
      link.click();
    } catch (error) { }
  };

    useEffect(() => {
      if (!session) toast.warn("Login First Then Edit Template..")
    }, [session])
  return (
    <DesignWraper>
      <DetailWrapper>
        {/* for image */}
        <div className="w-full h-[20%] relative outline-none">
          <input
            className="rounded-xl bg-red-500 w-[40%] mr-2 outline-none"
            type="file"
            accept="image/*"
            placeholder=""
            onChange={getLogo}
          />
          {/*dwonload button */}

          {
            purchased ?? isPaid ?
              <button
                onClick={handleDownload}
                className=" top-[0%] right-[3%] bg-green-400 px-5 py-1 text-black rounded-md"
              >
                Download
              </button>

              :
              <button onClick={pay} className=" top-[0%] right-[3%] bg-red-500 px-5 py-1 text-black rounded-md">
                Purchase
              </button>

          }
          <br />
          <label htmlFor="Sizes">Sizes</label>
          <div className="mt-1 flex justify-center">
            <div className="flex justify-center items-center gap-2  w-[40%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
              <p className="">width :</p>
              <CiCircleInfo
                onMouseEnter={() => setInfo({ width: true })}
                onMouseLeave={() => setInfo({ width: false })}
                className="absolute top-[35px] left-[55%] md:left-[58%] lg:left-[55%] xl:left-[55%] bg-white rounded-full text-black text-xl"
              />
              <Input
                type="number"
                min={1}
                max={100}
                placeholder="100"
                value={wSize != null ? wSize : ""}
                onChange={(e) => handelSize(e, "wSize")}
                className="bg-red-200 w-[40%] md:w-[50%] lg:w-[40%] xl:w-[35%] text-black outline-none"
              />
            </div>
            <div className="flex justify-center items-center gap-1   w-[40%] md:w-[50%] lg:w-[40%] xl:w-[35%]">
              <p className="">height :</p>
              <Input
                type="number"
                min={1}
                placeholder="100"
                value={hSize != null ? hSize : ""}
                onChange={(e) => handelSize(e, "hSize")}
                className="bg-red-200 w-[40%] md:w-[50%] lg:w-[40%] xl:w-[35%] text-black outline-none"
              />
            </div>
            {info.width ? (
              <div className="z-50 w-[60%] absolute bg-green-300 text-black rounded-lg">
                To see best result. increase sizes by 5%
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* title */}
        <div className=" w-[100%] px-3 pt-1">
          <div className="flex justify-start items-center gap-1 flex-row">
            <label htmlFor="bussiness name" className="min-w-[22%]">
              Name:
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white relative text-black max-w-[70%]"
            />
          </div>
          <div className=" w-full flex justify-start items-center gap-1 mt-1">
            <label htmlFor="size" className="min-w-[22%]">
              Size :
            </label>
            <Input
              type="number"
              min={1}
              className="outline-none text-black bg-white max-w-[70%]"
              value={titleSize == null ? "" : titleSize}
              onChange={(e) => handelTextSize(e, "titleSize")}
            />
          </div>
          <div className=" w-full flex justify-start items-center gap-1 mt-1">
            <label htmlFor="service" className="min-w-[22%]">
              service :
            </label>
            <Input
              type="text"
              min={1}
              className="outline-none text-black bg-white max-w-[70%]"
              value={service}
              onChange={(e) => setServices(e.target.value)}
            />
          </div>
          <div className=" w-full flex justify-start items-center gap-1 mt-1">
            <label htmlFor="serviceSize" className="min-w-[22%]">
              Size :
            </label>
            <Input
              type="number"
              min={1}
              className="outline-none text-black bg-white max-w-[70%]"
              value={serviceSize == null ? "" : serviceSize}
              onChange={(e) => handelTextSize(e, "serviceSize")}
            />
          </div>
        </div>

        {/* date */}
        <div className=" mt-2 w-[95%] mx-auto px-3 flex justify-center items-center gap-2">
          <div className=" w-[50%]">
            <label htmlFor="Date">Date</label>
            <Input
              className="w-full bg-white text-black"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className=" w-[50%]">
            <label htmlFor="Date">Time</label>
            <Input
              className="w-full bg-white text-black"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        {/* mainperson */}
        <div className=" w-[100%] pt-1">
          <div className="flex justify-start items-center gap-1 flex-row">
            <label
              htmlFor="bussiness name"
              className="min-w-[24%] flex justify-center items-center gap-1"
            >
              <GiBowTieRibbon className="text-xl text-red-500" />
              Name:
            </label>
            <Input
              type="text"
              value={opener}
              onChange={(e) => setOpener(e.target.value)}
              className="bg-white text-black max-w-[70%]"
            />
          </div>
          <div className="flex justify-start items-center gap-1 flex-row">
            <label
              htmlFor="bussiness name"
              className="min-w-[24%] flex justify-center items-center gap-1"
            >
              Position:
            </label>
            <Input
              type="text"
              value={openerPosition}
              onChange={(e) => setOpenerPosition(e.target.value)}
              className="bg-white text-black max-w-[70%]"
            />
          </div>
          <div className="flex justify-start items-center gap-1 flex-row">
            <label
              htmlFor="bussiness name"
              className="min-w-[24%] flex justify-center items-center "
            >
              <IoIosStarHalf />
              person:
            </label>
            <Input
              type="text"
              value={starPerson}
              onChange={(e) => setStarPerson(e.target.value)}
              className="bg-white text-black max-w-[70%]"
            />
          </div>
          <div className="flex justify-start items-center gap-1 flex-row">
            <label
              htmlFor="bussiness name"
              className="min-w-[24%] flex justify-center items-center gap-1"
            >
              Position:
            </label>
            <Input
              type="text"
              value={starPosition}
              onChange={(e) => setStarPosition(e.target.value)}
              className="bg-white text-black max-w-[70%]"
            />
          </div>
          <div className="flex justify-start items-center gap-1 flex-row">
            <label
              htmlFor="bussiness name"
              className="min-w-[24%] flex justify-center items-center gap-1"
            >
              Invitor:
            </label>
            <Input
              type="text"
              value={invitor}
              onChange={(e) => setInvitor(e.target.value)}
              className="bg-white text-black max-w-[70%]"
            />
          </div>
          <div className="flex justify-start items-center gap-1 flex-row">
            <label
              htmlFor="bussiness name"
              className="min-w-[24%] flex justify-center items-center gap-1"
            >
              Location:
            </label>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="bg-white text-black max-w-[70%]"
            />
          </div>
        </div>

        {/* translate btn */}

        {/* <Button className="bg-red-400 mt-1 w-[30%] mx-auto" onClick={() => ""}>
          AutoTranslate
        </Button> */}
      </DetailWrapper>

      {/* design stard div */}
      <DesignContainer>
        <div
          ref={containerRef}
          className="relative w-full md:h-[auto] mx-auto flex justify-center items-center"
        >
          <Image
            src={`/firstinvitationdesignv2.png`}
            alt="invitation image"
            width={700}
            height={500}
          />
          <div className=" absolute top-[24%] w-full xl:w-[700px] h-[8.5%] flex justify-center items-center">
            <div className=" w-[20%] h-[100%]  overflow-hidden relative flex justify-center items-center">
              {brandLogo ? (
                <NextImage
                  src={brandLogo}
                  alt="brand logo"
                  style={{
                    width: `${wSize != null ? wSize : 100}%`,
                    height: `${hSize != null ? hSize : 100}%`,
                  }}
                  width={500}
                  height={500}
                />
              ) : (
                <Image
                  className={` w-[82%] md:w-[80%] rounded-full outline-none`}
                  src={"/ganeshWhite.jpg"}
                  alt="ganesh photo logo"
                  width={500}
                  height={500}
                />
              )}
            </div>
          </div>
          <div className=" absolute top-[33%] w-full xl:w-[700px] h-[14.8%] flex justify-center items-center">
            <div
              style={{ fontSize: titleSize ? `${titleSize}%` : undefined }}
              className={`${wordsArr.length >= 3 ? "text-[10vw] xl:text-[80px]" : "text-[16.5vw] xl:text-[120px]"} md:text-[8.9vw] ${yatraOne.className}  w-[90%] h-full flex justify-center items-center gap-5 text-red-500`}
            >
              <span className={`text-red-500 truncate`}>
                {otherWords.join(" ")}
              </span>
              <span className={`text-black`}>{lastWord}</span>
            </div>
          </div>
          <div className=" absolute top-[48.3%] w-full xl:w-[700px] h-[4.7%] flex justify-center items-center">
            <div
              style={{ fontSize: serviceSize ? `${serviceSize}%` : undefined }}
              className={`w-[90%]  h-full ${palanquinDark.className} flex justify-center items-center text-[3.5vw] md:text-[2.4vw] xl:text-[25px]  dark:text-black truncate`}
            >
              {service}
            </div>
          </div>
          <div className="w-full xl:w-[700ox] absolute top-[60.5%] h-[2.6%] flex justify-center items-center gap-[5%]">
            <div
              className={`w-[81%] h-full  flex text-red-500 ${sura.className} `}
            >
              <div
                className={`w-[51%] mr-[10%] flex justify-end items-center text-[3vw] md:text-[1.7vw] xl:text-[22px] tracking-wide`}
              >
                {date}
              </div>
              <div className="w-[39%]  flex justify-start pl-1 items-center text-[3vw] tracking-wider md:text-[1.9vw] xl:text-[22px]">
                {time}
              </div>
            </div>
          </div>
          <div className=" absolute top-[69.7%] w-full xl:w-[700px] h-[5.4%] flex flex-col items-center">
            <div
              className={` w-[90%] h-[60.3%] ${amita.className} text-[2.5vw] md:text-[1.5vw] xl:text-[20px] font-bold text-red-500`}
            >
              {opener}
            </div>
            <div className="text-black w-[90%] h-[40%] text-[2vw] md:text-[1vw] xl:text-[14px] flex justify-center items-center font-extrabold">
              {openerPosition}
            </div>
          </div>
          <div className=" absolute top-[77.9%] w-full xl:w-[700px] h-[5.2%] flex flex-col items-center">
            <div
              className={`b w-[90%] h-[60.3%] ${amita.className} text-[2.5vw] md:text-[1.5vw] xl:text-[20px] font-bold text-red-500`}
            >
              {starPerson}
            </div>
            <div className="text-black w-[90%] h-[38%] text-[1.9vw] md:text-[1vw] xl:text-[12px] flex justify-center items-center font-extrabold">
              {starPosition}
            </div>
          </div>

          <div className=" absolute top-[86.6%] w-full xl:w-[700px] h-[3.4%] flex justify-center items-center">
            <div
              className={` w-[70%] h-full flex justify-center items-center text-[3.3vw] md:text-[2vw] xl:text-[27px] text-red-500 ${yatraOne.className}`}
            >
              {invitor}
            </div>
          </div>
          <div className=" absolute top-[91%] w-full xl:w-[700px] h-[3.5%] flex items-center">
            <div className=" relative pl-1 w-[90%] mx-auto h-full text-red-600 text-[2vw] md:text-[1.2vw] xl:text-[15px] font-semibold flex items-center gap-1  truncate">
              <div className="ml-1">स्थळ:</div>
              {location}
            </div>
          </div>
        </div>
      </DesignContainer>
    </DesignWraper>
  );
}
