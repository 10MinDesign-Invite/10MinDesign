
import { handleDownload } from "@/app/(main)/(templates)/utils/handelDwonload";
import { inknut_antiqua, laila } from "@/app/fonts/fonts-config";
import { Image } from "@imagekit/next";
import NextImage from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { DesignContainer } from "../../category-components/DesignContainer";
import { DesignWraper } from "../../category-components/DesignWraper";
import { DetailWrapper } from "../../category-components/DetailWrapper";
import { usePayment } from "@/app/Hooks/usePayment";
import { Button } from "@/components/ui/button";
import { useClientSession } from "@/app/Hooks/useClientSession";
import { usePurchesedTemplate } from "@/app/Hooks/usePurchasedTemplate";
import { toast } from "react-toastify";
import { useDragComponent } from "@/app/helpers/useDragComponents";

export default function Wedding1() {
  const { pay, isPaid } = usePayment("Wedding1","wedding");
  const { purchased } = usePurchesedTemplate("Wedding1")
  const { session } = useClientSession();
  const {handlePointerDown,handlePointerMove,handlePointerUp} = useDragComponent();
  // above custom hooks

  const containerRef = useRef(null);
  const [name1, setName1] = useState("सैनी");
  const [name2, setName2] = useState("शेट्टी");
  const [firstName1, setFirstName1] = useState("राजीव");
  const [firstNameInfo1, setFirstNameInfo1] = useState(
    "डॉ.दयाल घुंगरु यांचा मुलगा.",
  );
  const [firstName2, setFirstName2] = useState("संजना");
  const [firstNameInfo2, setFirstNameInfo2] = useState(
    "उदय शंकर शेट्टी यांची बहिण.",
  );
  const [date1, setDate1] = useState(
    "बुधवार दि. १२/०९/२०२५ रोजी सायं ०५:३० वा",
  );
  const [date2, setDate2] = useState(
    "बुधवार दि. १२/०९/२०२५ रोजी सायं ११:०० वा व दुपारी ०२:०० वा (विवाहस्थळी)",
  );
  const [location, setLocation] = useState("मंगल कार्यालय");
  const [locationAdd, setLocationAdd] = useState("ता. xyz जि. xyz location");
  const [relats, setRelates] = useState("सौ/श्री.name (मामा/मामी)");
  const [invite, setInvite] = useState("समस्त xyz परिवार व abc");
  const [whichSize, setWhichSize] = useState("");
  const [sizes, setSizes] = useState({
    name1: 1,
    name2: 1,
    firstName1: 1,
    firstNameInfo1: 1,
    firstName2: 1,
    firstNameInfo2: 1,
    Date2: 1,
    location: 1,
    Info: 1,
    relats: 1,
    invite: 1,
  });
  const [coupleImage, setCoupleImage] = useState<string>("");

  useEffect(() => { }, [whichSize]);

  useEffect(() => {
    if (!session) toast.warn("Login ")
  }, [session])

  function getCoupleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setCoupleImage(event.target?.result as string);
      };

      reader.readAsDataURL(file);
    }
  }
  return (

    <DesignWraper customeStyles="flex flex-col lg:flex-row items-center lg:items-start text-black">
      <DetailWrapper customeStyles="relative w-full md:w-[70%] dark:text-white mb-[25px] lg:mb-0 dark:shadow-[inset_0px_0px_14px_0px_#e53e3e] shadow-[0px_7px_13px_0px_#63b3ed]">
        <div className="w-full gap-[3.5%]">
          <div className="w-[80%] flex justify-end items-center mb-2">
            <input
              type="file"
              onChange={getCoupleImage}
              accept="image/*"
              placeholder="select your image"
              className="rounded-md bg-red-300 text-black w-[75%]"
            />
          </div>
          {
            purchased ?? isPaid ?
              <Button
                className="bg-green-400 text-black px-2 py-1 rounded-lg mb-2"
                onClick={() => handleDownload(containerRef)}
              >
                {""}
                dwonload
              </Button>

              :
              <Button onClick={pay} className="bg-red-600 text-white mb-3 dark:hover:text-black px-6">
                Purchase
              </Button>

          }
        </div>

        <div className="flex mb-1">
          <div className=" w-[80%] flex flex-col gap-1">
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px] "
              >
                name1 :
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-[75%] rounded-md pl-1 md:p-1 dark:text-black"
                placeholder="सैनी"
              />
            </div>
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px] "
              >
                name2 :
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-[75%] rounded-md pl-1 md:p-1 dark:text-black"
                placeholder="शेट्टी"
              />
            </div>
          </div>
          <div className=" w-[20%] text-sm md:text-[16px] flex justify-center items-center">
            <button
              onClick={() => setWhichSize("name1 And name2")}
              className="bg-slate-300 px-2 py-2 rounded-lg dark:text-black"
            >
              Edit Size
            </button>
          </div>
        </div>
        <div className="flex mb-1">
          <div className="w-[80%] flex flex-col gap-1">
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                name1 :
              </label>
              <input
                type="text"
                value={firstName1}
                onChange={(e) => setFirstName1(e.target.value)}
                className="w-[75%] rounded-md md:p-1 dark:text-black"
                placeholder="राजीव"
              />
            </div>
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                Info :
              </label>
              <textarea
                value={firstNameInfo1}
                onChange={(e) => setFirstNameInfo1(e.target.value)}
                placeholder="डॉ.दयाल घुंगरु यांचा मुलगा"
                spellCheck={false}
                className="w-[75%] px-1 bg-slate-200 rounded-lg border-none resize-none text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="w-[20%] text-sm md:text-[16px] flex justify-center items-center">
            <button
              onClick={() => setWhichSize("firstName1 And Info")}
              className="bg-slate-300 px-2 py-2 rounded-lg dark:text-black"
            >
              Edit Size
            </button>
          </div>
        </div>
        <div className="flex mb-1">
          <div className="w-[80%] flex flex-col gap-1">
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                name2 :
              </label>
              <input
                type="text"
                value={firstName2}
                onChange={(e) => setFirstName2(e.target.value)}
                className="w-[75%] rounded-md md:p-1 dark:text-black"
                placeholder="संजना"
              />
            </div>
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                Info :
              </label>
              <textarea
                value={firstNameInfo2}
                onChange={(e) => setFirstNameInfo2(e.target.value)}
                placeholder="उदय शंकर शेट्टी यांची बहिण"
                spellCheck={false}
                className="w-[75%] px-1 bg-slate-200 rounded-lg border-none resize-none text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="w-[20%] text-sm md:text-[16px] flex justify-center items-center">
            <button
              onClick={() => setWhichSize("firstName2 And Info")}
              className="bg-slate-300 px-2 py-2 rounded-lg dark:text-black"
            >
              Edit Size
            </button>
          </div>
        </div>
        <div className="w-[80%] flex justify-between mb-1">
          <label htmlFor="" className="w-[20%] text-sm md:text-[16px]">
            Date1 :
          </label>
          <input
            type="text"
            value={date1}
            onChange={(e) => setDate1(e.target.value)}
            className="w-[75%] md:p-1 rounded-md dark:text-black"
            placeholder="बुधवार दि. १२/०९/२०२५ रोजी सायं ०५:३० वा"
          />
        </div>
        <div className="flex mb-1">
          <div className="w-[80%] flex flex-col gap-1">
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                Date2 :
              </label>
              <textarea
                value={date2}
                onChange={(e) => setDate2(e.target.value)}
                placeholder="बुधवार दि. १२/०९/२०२५ रोजी सायं ११:०० वा
                                             व दुपारी ०२:०० वा (विवाहस्थळी)"
                spellCheck={false}
                className="w-[75%] px-1 bg-slate-200 rounded-lg border-none resize-none text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="w-[20%] text-sm md:text-[16px] flex justify-center items-center">
            <button
              onClick={() => setWhichSize("Date2")}
              className="bg-slate-300 px-2 py-2 rounded-lg dark:text-black"
            >
              Edit Size
            </button>
          </div>
        </div>
        <div className="flex mb-1">
          <div className="w-[80%] flex flex-col gap-1">
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                location:
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-[75%] rounded-md md:p-1 dark:text-black"
                placeholder="मंगल कार्यालय"
              />
            </div>
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                Info :
              </label>
              <textarea
                value={locationAdd}
                onChange={(e) => setLocationAdd(e.target.value)}
                placeholder="ता. xyz जि. xyz location"
                spellCheck={false}
                className="w-[75%] px-1 bg-slate-200 rounded-lg border-none resize-none text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="w-[20%] text-sm md:text-[16px] flex justify-center items-center">
            <button
              onClick={() => setWhichSize("location And Info")}
              className="bg-slate-300 px-2 py-2 rounded-lg dark:text-black"
            >
              Edit Size
            </button>
          </div>
        </div>
        <div className="flex mb-1">
          <div className="w-[80%] flex flex-col gap-1">
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                relats :
              </label>
              <textarea
                value={relats}
                onChange={(e) => setRelates(e.target.value)}
                placeholder="सौ/श्री.name (मामा/मामी)"
                spellCheck={false}
                className="w-[75%] px-1 bg-slate-200 rounded-lg border-none resize-none text-black placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="w-[20%] text-sm md:text-[16px] flex justify-center items-center">
            <button
              onClick={() => setWhichSize("relats")}
              className="bg-slate-300 px-2 py-2 rounded-lg dark:text-black"
            >
              Edit Size
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="w-[80%] flex flex-col gap-1">
            <div className="flex justify-between">
              <label
                htmlFor="lastname"
                className="w-[20%] text-sm md:text-[16px]"
              >
                Invite :
              </label>
              <input
                type="text"
                value={invite}
                onChange={(e) => setInvite(e.target.value)}
                className="w-[75%] rounded-md md:p-1 dark:text-black"
                placeholder="समस्त xyz परिवार व abc"
              />
            </div>
          </div>
          <div className="w-[20%] text-sm md:text-[16px] flex justify-center items-center">
            <button
              onClick={() => setWhichSize("invite")}
              className="bg-slate-300 px-2 py-2 rounded-lg dark:text-black"
            >
              Edit Size
            </button>
          </div>
        </div>
        {/* sizes */}
        <div
          className={`mt-4 outline sticky start-10 mx-auto  lg:absolute lg:-ml-5 top-[7%] left-[3%] w-[100%] sm:w-[75%] ${whichSize == "" ? "hidden" : "block"}`}
        >
          {whichSize == "name1 And name2" && (
            <div className="w-full bg-white">
              <div className="flex justify-end">
                <div
                  onClick={() => setWhichSize("")}
                  className="w-[30px] cursor-pointer bg-red-400"
                >
                  X
                </div>
              </div>
              <div className="outline p-2 flex flex-col gap-1 dark:text-black">
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="flex justify-center items-center"
                  >
                    name1 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.name1}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        name1: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="flex justify-center items-center"
                  >
                    name2 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.name2}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        name2: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
              </div>
            </div>
          )}
          {whichSize == "firstName1 And Info" && (
            <div className="w-full bg-white">
              <div className="flex justify-end">
                <div
                  onClick={() => setWhichSize("")}
                  className="w-[30px] cursor-pointer bg-red-400"
                >
                  X
                </div>
              </div>
              <div className="outline p-2 flex flex-col gap-1 dark:text-black">
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    name1 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.firstName1}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        firstName1: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    Info1 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.firstNameInfo1}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        firstNameInfo1: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
              </div>
            </div>
          )}
          {whichSize == "firstName2 And Info" && (
            <div className="w-full bg-white">
              <div className="flex justify-end">
                <div
                  onClick={() => setWhichSize("")}
                  className="w-[30px] cursor-pointer bg-red-400"
                >
                  X
                </div>
              </div>
              <div className="outline p-2 flex flex-col gap-1 dark:text-black">
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    name2 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.firstName2}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        firstName2: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    Info2 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.firstNameInfo2}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        firstNameInfo2: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
              </div>
            </div>
          )}
          {whichSize == "Date2" && (
            <div className="w-full bg-white">
              <div className="flex justify-end">
                <div
                  onClick={() => setWhichSize("")}
                  className="w-[30px] cursor-pointer bg-red-400"
                >
                  X
                </div>
              </div>
              <div className="outline p-2 flex flex-col gap-1 dark:text-black">
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    Date2 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.Date2}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        Date2: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
              </div>
            </div>
          )}
          {whichSize == "location And Info" && (
            <div className="w-full bg-white">
              <div className="flex justify-end">
                <div
                  onClick={() => setWhichSize("")}
                  className="w-[30px] cursor-pointer bg-red-400"
                >
                  X
                </div>
              </div>
              <div className="outline p-2 flex flex-col gap-1 dark:text-black">
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    location:
                  </label>
                  <input
                    id="name1"
                    value={sizes.location}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        location: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    Info2 :
                  </label>
                  <input
                    id="name1"
                    value={sizes.Info}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        Info: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
              </div>
            </div>
          )}
          {whichSize == "relats" && (
            <div className="w-full bg-white">
              <div className="flex justify-end">
                <div
                  onClick={() => setWhichSize("")}
                  className="w-[30px] cursor-pointer bg-red-400"
                >
                  X
                </div>
              </div>
              <div className="outline p-2 flex flex-col gap-1 dark:text-black">
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    relats :
                  </label>
                  <input
                    id="name1"
                    value={sizes.relats}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        relats: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
              </div>
            </div>
          )}
          {whichSize == "invite" && (
            <div className="w-full bg-white">
              <div className="flex justify-end">
                <div
                  onClick={() => setWhichSize("")}
                  className="w-[30px] cursor-pointer bg-red-400"
                >
                  X
                </div>
              </div>
              <div className="outline p-2 flex flex-col gap-1 dark:text-black">
                <div className="flex flex-row gap-2 justify-center">
                  <label
                    htmlFor="name1"
                    className="w-[22%] flex justify-center items-center"
                  >
                    invite :
                  </label>
                  <input
                    id="name1"
                    value={sizes.invite}
                    onChange={(e) =>
                      setSizes((prev) => ({
                        ...prev,
                        invite: Number(e.target.value),
                      }))
                    }
                    type="number"
                    min={1}
                    className="bg-slate-200 rounded-md py-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </DetailWrapper>

      <DesignContainer customeStyles="w-[80%]">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          
          className="relative w-full h-full md:h-[auto] mx-auto flex justify-center items-center select-none"
        >
          {/* top most section */}
          <div className="absolute top-[0%] left-[0%] w-[8%] h-[8.5%] skew-[40]">
            <Image
              src="/first_wedding_bells.png"
              width={800}
              height={500}
              alt={"main image"}
            />
          </div>
          <div className="absolute top-[0%] right-[0%] w-[8%] h-[8.5%] rotate-[360deg]">
            <Image
              className="scale-x-[-1]"
              src="/first_wedding_bells.png"
              width={800}
              height={500}
              alt={"main image"}
            />
          </div>
          <Image
            // src="/firstwedding.jpg"
            src="/white_background_vertical.jpg"
            width={800}
            height={500}
            alt={"main image"}
          />
          <div className="absolute top-[0.5%] right-[11%] w-[9.5%]">
            <Image
              data-draggable="true"
              draggable={false}
              style={{ width: "100%", height: "100%" }}
              src="/swastik_red.png"
              width={40}
              height={500}
              alt={"main image"}
            />
          </div>
          <div data-draggable="true" className="absolute top-[3%] left-[28.4%] lg:left-[30%] w-[13.5%] h-[8.9%] lg:w-[10.9%] lg:h-[7.2%] overflow-hidden">
            <Image
              draggable={false}
              src="/first_wedding_ganpati.png"
              style={{ width: "100%", height: "100%" }}
              alt="ganpati"
              width={100}
              height={100}
              priority={true}
              className="elect-none touch-none"
            />
          </div>
          {/* images end */}
          {/* ---------------------------------------------------------------------- */}
          <p
            className={`absolute select-none top-[0%] left-[20%] w-[30%] h-[2.5%] text-[1.9vw] lg:text-[1vw] xl:text-[14px] ${laila.className} font-[700] text-red-700`}
            data-draggable="true"
          >
            || {"श्री गणेशाय नम:"} ||
          </p>

          <div
            style={{
              fontSize: `${sizes.name1 == 1 ? undefined : `${sizes.name1}px`}`,
            }}
            data-draggable="true"
            className={`absolute top-[3%] left-[45.5%] w-[29.5%] h-[4.5%] flex justify-center items-center text-[3vw] lg:text-[2vw] xl:text-[23px] ${inknut_antiqua.className} font-[900] bg-gradient-to-b from-red-400 to-red-800 bg-clip-text text-transparent`}
          >
            {name1}
          </div>
          <div
            style={{
              fontSize: `${sizes.name2 == 1 ? undefined : `${sizes.name2}px`}`,
            }}
            data-draggable="true"
            className={`absolute top-[8%] left-[50.5%] w-[29.5%] h-[4.5%] flex justify-center items-center text-[3vw] lg:text-[2vw] xl:text-[23px] ${inknut_antiqua.className} font-[900] bg-gradient-to-b from-red-400 to-red-800 bg-clip-text text-transparent`}
          >
            {name2}
          </div>

          {/* ================================================================================= */}
          {/* second section */}
          {/* images  start*/}
          <div data-draggable="true" className="absolute top-[13.8%] left-[0%] w-[17%]">
            <Image
              draggable={false}
              src="/first_wedding_nimantran.png"
              style={{ width: "100%", height: "100%" }}
              alt="nimantran invite photo"
              width={100}
              height={100}
              priority={true}
            />
          </div>
          {/* images end ===================================================================== */}
          <p data-draggable="true" className="absolute text-[2vw] lg:text-[1vw] xl:text-[12.5px] top-[10%] left-[17%] font-bold text-red-700">
            चि.
          </p>
          <div
            style={{
              fontSize: `${sizes.firstName1 == 1 ? undefined : `${sizes.firstName1}px`}`,
            }}
            data-draggable="true"
            className={`absolute top-[12.5%] left-[20.5%] w-[34.9%] h-[7.3%] font-extrabold text-[9vw] lg:text-[7vw] xl:text-[100px] flex justify-center items-center text-red-700 ${laila.className}`}
          >
            {firstName1}
          </div>
          <p data-draggable="true" className="absolute text-[2vw] lg:text-[1vw] xl:text-[12.5px] top-[19.4%] left-[17%] font-bold text-red-700">
            चि.सौ.कां.
          </p>
          <div
            style={{
              fontSize: `${sizes.firstName2 == 1 ? undefined : `${sizes.firstName2}px`}`,
            }}
            data-draggable="true"
            className={`absolute top-[22.3%] left-[20.5%] w-[34.9%] h-[7.3%] font-bold text-[9vw] lg:text-[7vw] xl:text-[100px] flex justify-center items-center text-red-700 ${laila.className}`}
          >
            {firstName2}
          </div>

          <p
            style={{
              fontSize: `${sizes.firstNameInfo1 == 1 ? undefined : `${sizes.firstNameInfo1}px`}`,
              lineHeight: "120%",
            }}
            data-draggable="true"
            className="flex items-center leading-[2vw] lg:leading-[1vw] whitespace-pre-wrap break-words absolute scrollbar-hide top-[12.5%] left-[60.1%] w-[40%] h-[7.3%] font-bold text-left text-[1.7vw] lg:text-[0.8vw] xl:text-[12.5px] overflow-x-hidden text-red-800"
          >
            {firstNameInfo1}
          </p>

          <p
            style={{
              fontSize: `${sizes.firstNameInfo2 == 1 ? undefined : `${sizes.firstNameInfo2}px`}`,
              lineHeight: "120%",
            }}
            data-draggable="true"
            className="flex items-center whitespace-pre-wrap leading-[2vw] lg:leading-[1vw] break-words absolute scrollbar-hide top-[22.3%] left-[60.1%] w-[40%] h-[7.3%] font-bold text-[1.6vw] lg:text-[0.8vw] xl:text-[12.5px] text-left overflow-x-hidden text-red-800"
          >
            {firstNameInfo2}
          </p>
          {/* third section */}
          {/* images start */}
          <div data-draggable="true" className="absolute w-[66.4%] h-[19%] top-[30%] left-[10.9%]">
            <Image
              draggable={false}
              src="/first_wedding_shubh_vivaha.png"
              style={{ width: "100%", height: "100%" }}
              alt="shubh vivaha"
              width={200}
              height={100}
              priority={true}
            />
            <div
              className={`absolute bottom-[14%] right-[5.7%] w-[68%] h-[15.5%] text-white font-bold text-[1.5vw] lg:text-[0.7vw] xl:text-[13px] bg-blac ${laila.className} flex justify-center items-center overflow-hidden`}
            >
              {date1}
            </div>
            <div
              className={`absolute bottom-[0%] right-[9%] w-[65%] h-[14%] text-[1.5vw] lg:text-[0.7vw] xl:text-[13px] font-bold text-white bg-blac ${laila.className} flex justify-center items-center overflow-hidden`}
            >
              या शुभ मुहूर्तावर करण्याचे योजिले आहे.
            </div>
          </div>
          <div data-draggable="true" className="absolute top-[35%] right-[4%] w-[18%] h-[10%]">
            <Image
              draggable={false}
              src="/first_wedding_dhol.png"
              style={{ width: "100%", height: "100%", position: "relative" }}
              alt="dhol or drum image"
              width={200}
              height={100}
              priority={true}
            />
          </div>

          {/* third section */}
          <div className="absolute top-[51%] left-[2%] w-[48.5%] h-[11%]">
            <div className="w-full h-full relative">
              <div data-draggable="true" className="w-[85%] h-[27%] mx-auto flex justify-between gap-1">
                <div className="h-full w-[10%] scale-x-[-1] mix-blend-multiply">
                  <Image
                    draggable={false}
                    src="/first_wedding_bars.png"
                    style={{ width: "100%", height: "100%" }}
                    alt="bars"
                    width={200}
                    height={100}
                    priority={true}
                  />
                </div>
                <div
                  className={`w-[80%] rounded-[35%] bg-orange-700 text-yellow-200 flex justify-center items-center text-[1.4vw] lg:text-[0.9vw] xl:text-[12px]`}
                >
                  {/* <p className="font-medium text-black">❀</p> */}
                  <div
                    className={`font-semibold flex justify-center items-center`}
                  >
                    {"साखरपुडा आणि हळदी समारंभ"}
                  </div>
                  {/* <p className="font-medium text-black">❀</p> */}
                </div>
                <div className="h-full w-[10%] mix-blend-multiply">
                  <Image
                    draggable={false}
                    src="/first_wedding_bars.png"
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                    alt="bars"
                    width={200}
                    height={100}
                    priority={true}
                  />
                </div>
              </div>

              <div data-draggable="true" className=" h-[75%] rounded-tl-lg p-[0.2vw] bg-orange-600 rounded-br-lg overflow-hidden">
                <div
                  style={{
                    fontSize: `${sizes.Date2 == 1 ? undefined : `${sizes.Date2}px`}`,
                  }}
                  className={`font-semibold leading-[2.1vw] lg:leading-[1.1vw] h-full w-full rounded-tl-lg bg-red-800 rounded-br-lg text-white text-[1.6vw] lg:text-[0.9vw] xl:text-[12px] flex justify-center items-center whitespace-pre-wrap break-words`}
                >
                  {date2}
                </div>
              </div>
            </div>
          </div>
          {/* =============================================================================================== */}
          {/* fourth section */}
          <div className="absolute top-[63%] left-[2%] w-[48.5%]">
            <div data-draggable="true" className="w-full flex justify-center items-center gap-1">
              <div className="w-[5%] scale-x-[-1] mix-blend-multiply">
                <Image
                  draggable={false}
                  src="/first_wedding_bars.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                  alt="ganpati image"
                  width={200}
                  height={100}
                  priority={true}
                />
              </div>
              <div className="w-[33%] text-[2.1vw] lg:text-[1vw] xl:text-[12.5px] p-[1px] text-white bg-gradient-to-b from-purple-400 to-red-800 rounded-[45%] flex font-bold justify-center items-center">
                विवाहस्थळ
              </div>
              <div className="w-[5%] mix-blend-multiply">
                <Image
                  draggable={false}
                  src="/first_wedding_bars.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                  alt="ganpati image"
                  width={200}
                  height={100}
                  priority={true}
                />
              </div>
            </div>
          </div>
          {/* ===================================================================================== */}
          {/* fift section */}
          <div data-draggable="true" className="absolute w-[48.5%] top-[66.8%] left-[2%] ">
            <div className="w-full relative flex justify-center items-center gap-[2px]">
              <div className="w-[6.4%] scale-x-[-1]">
                <Image
                  draggable={false}
                  src="/first_wedding_bars.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                  alt="bars"
                  width={200}
                  height={100}
                  priority={true}
                />
              </div>
              <div
                style={{
                  fontSize: `${sizes.location == 1 ? undefined : `${sizes.location}px`}`,
                }}
                className={`w-[80%] xl:w-[300px] text-[2.5vw] lg:text-[1.4vw] xl:text-[20px] font-extrabold text-red-800 ${laila.className}`}
              >
                {location}
              </div>
              <div className="w-[6.4%] mix-blend-multiply">
                <Image
                  draggable={false}
                  src="/first_wedding_bars.png"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                  alt="bars"
                  width={200}
                  height={100}
                  priority={true}
                />
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: `${sizes.Info == 1 ? undefined : `${sizes.Info}px`}`,
              overflow: "hidden",
            }}
            data-draggable="true"
            className="absolute top-[71.4%] left-[2%] w-[48.5%] h-[5.5%] flex justify-center items-center text-[1.2vw] lg:text-[0.6vw] xl:text-[12.5px] font-bold"
          >
            {locationAdd}
          </div>
          {/* ================================================================================== */}
          {/* sixth section */}
          <div data-draggable="true" className="absolute top-[77.3%] left-[2%] w-[48.5%] h-[4%]">
            <div className="w-[33%] mx-auto text-[2.1vw] lg:text-[1vw] xl:text-[14.5px] p-[1px] text-white bg-gradient-to-b from-purple-400 to-red-800 rounded-[45%] flex font-bold justify-center items-center">
              आपले नम्र
            </div>
          </div>

          <div
            style={{
              fontSize: `${sizes.relats == 1 ? undefined : `${sizes.relats}px`}`,
              lineHeight: "120%",
            }}
            data-draggable="true"
            className="leading-[2vw] lg:leading-[1vw] xl:text-[12.5px] whitespace-pre-wrap break-words absolute top-[81.5%] left-[2%] w-[48.5%] h-[12%] font-bold flex justify-center items-center text-[1.6vw] lg:text-[0.8vw] overflow-hidden text-red-800"
          >
            {relats}
          </div>

          {/* ===================================================================================== */}
          {/* sixth section */}
          <div className="absolute bg-amber-100 bottom-0 left-0 h-[6%] w-full flex items-center">
            <div data-draggable="true" className="w-[10%] h-full">
              <Image
                draggable={false}
                src="/first_wedding_elephant.png"
                style={{ width: "100%", height: "100%", position: "relative" }}
                alt="elephant image"
                width={200}
                height={100}
                priority={true}
              />
            </div>
            <div data-draggable="true" className=" w-[12%] h-[50%]  rounded-[50%] flex justify-center items-center text-[1.5vw] lg:text-[0.9vw] xl:text-[16.5px] font-bold bg-gradient-to-t from-purple-500 to-red-600 text-white">
              निमंत्रक
            </div>
            <div
              style={{
                fontSize: `${sizes.invite == 1 ? undefined : `${sizes.invite}px`}`,
              }}
              data-draggable="true"
              className="w-[78%] h-full text-slate-700 font-bold text-[3.5vw] lg:text-[2vw] xl:text-[23px] flex justify-center items-center"
            >
              {invite}
            </div>
            <div data-draggable="true" className="w-[10%] h-full scale-x-[-1]">
              <Image
                draggable={false}
                src="/first_wedding_elephant.png"
                style={{ width: "100%", height: "100%", position: "relative" }}
                alt="elephant image"
                width={200}
                height={100}
                priority={true}
              />
            </div>
          </div>
          {/* last sec image */}
          <div data-draggable="true" className="absolute top-[51%] left-[51.5%] w-[46.8%] h-[42%] overflow-hidden">
            <div className="relative w-full h-full">
              <div data-draggable="true" className="w-[85%] rotate-90 mx-auto">
                <Image
                  draggable={false}
                  className="object-cover w-full h-full"
                  src="/redScrollBar.png"
                  width={500}
                  height={200}
                  alt="red scroll"
                />
              </div>
              <div data-draggable="true" className="absolute w-full h-full top-0">
                {coupleImage != "" ? (
                  <NextImage
                    draggable={false}
                    className="outlin object-cover w-full h-full"
                    src={coupleImage}
                    width={500}
                    height={200}
                    alt="couple image"
                  />
                ) : (
                  <Image
                    draggable={false}
                    className="outlin object-cover w-full h-full"
                    src="gibliphoto.png"
                    width={500}
                    height={200}
                    alt="red scroll"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </DesignContainer>
    </DesignWraper>
  );
}
