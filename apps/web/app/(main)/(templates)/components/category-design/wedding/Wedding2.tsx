import { gotu, sura, tillana } from "@/app/fonts/fonts-config";
import { Image } from "@imagekit/next";
import { DesignWraper } from "../../category-components/DesignWraper";
import { useEffect, useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDragComponent } from "@/app/helpers/useDragComponents";
import { Button } from "@/components/ui/button";
import { usePayment } from "@/app/Hooks/usePayment";
import { usePurchesedTemplate } from "@/app/Hooks/usePurchasedTemplate";
import { useClientSession } from "@/app/Hooks/useClientSession";
import { handleDownload } from "../../../utils/handelDwonload";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";




export default function Wedding2() {

    const { pay, isPaid } = usePayment("Wedding2", "wedding");
    const { purchased } = usePurchesedTemplate("Wedding2")
    const { session } = useClientSession();

    const { handlePointerDown, handlePointerMove, handlePointerUp } = useDragComponent();
    const containerRef = useRef(null);

    const [activate, setActivate] = useState({ name1: false, name2: false, relative1: false, relative2: false, date: false, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: false })
    const [globalEdit, setGlobalEdit] = useState(false)
    const [edit, setEdit] = useState(false)
    const [data, setData] = useState({
        name1: "नेहा",
        relative1: "कै. निवृत्ती गणेश पाटील यांची नात व सौ. अक्षदा श्री. गणपत पाटील रा. माळेगाव बु. ता. बारामती जि. पुणे यांची कन्या",
        name2: "hii",
        relative2: "कै. निवृत्ती शामराव पवार यांचा नातू व सौ. कमला श्री. राम पवार रा. माळेगाव बु. ता. बारामती जि. पुणे यांचे कनिष्ठ चिरंजीव",
        date: "रविवार दिनांक १२/०२/२०२६ रोजी दुपारी १.३० वा.",
        karyalaya: "तुकाराम मंगल कार्यालय",
        karyalayaAddress: "अलंकापुरी,कुरुबावी दहिगाव रोड ता.माळशिरस,जि.सोलापूर",
        haladDate: "रविवार दी.८/१/२०२६ रोजी स.10:15 वा (विवाहस्थळी)",
        nimantrak: "समस्त पाटील परिवार"
    })
    const [size, setSize] = useState({
        name1: 100,
        relative1: 100,
        name2: 100,
        relative2: 100,
        date: 100,
        karyalaya: 100,
        karyalayaAddress: 100,
        haladDate: 100,
        nimantrak: 100
    })
    const [currentField, setCurrentField] = useState<null | keyof typeof data>(null);
    const [currentSize, setCurrentSize] = useState<null | keyof typeof data>(null);
    const [isBigField, setIsBigField] = useState(false);

    useEffect(() => {
        console.log(isBigField)
    }, [size, isBigField,globalEdit])

    return (
        <DesignWraper customeStyles="flex flex-col">
            {/* top section */}
            <div className="border flex justify-around">
                {
                    purchased ?? isPaid ?
                        <Button onClick={() => handleDownload(containerRef)}>Download Template</Button>
                        :
                        <Button onClick={pay}>Buy Template</Button>
                }

                <div className="border-[2px] border-purple-500 flex justify-center items-center rounded-xl px-3">

                    <Switch checked={globalEdit} onCheckedChange={(value) => {
                        setGlobalEdit(value)
                        setActivate(() => ({ name1: false, name2: false, relative1: false, relative2: false, date: false, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: false }))
                        }} id="airplane-mode" />
                    <Label htmlFor="airplane-mode">Edit</Label>

                </div>

            </div>

            <section className="relative p-2 w-full h-full lg:w-[1000px]  mx-auto">
                <Image
                    src={"/purple-bg.png"}
                    width={800}
                    height={100}
                    alt="main bg image"
                    className="w-full"
                />
                <div className="absolute w-full h-full p-3 top-0 left-0 flex justify-center items-center">

                    {/* first section */}
                    <div className=" h-full w-[50%] text-whit ">
                        <div className=" relative  w-[95%] h-[90%] mx-auto rotate-6">
                            <div className={`h-[15%] text-[1.4vw] lg:text-[15px] mx-auto text-center text-white `}>
                                <p className={`${gotu.className}`}>नाती जन्मोजन्मांची</p>
                                <p className={`${gotu.className}`}>परमेश्वराने जोडलेली.</p>
                                <p className={`${gotu.className}`}>दोन जीवांची प्रेम भरल्या.</p>
                                <p className={`${tillana.className} text-[1.9vw] lg:text-[20px] text-yellow-200`}>रेशीम गाठींनी.</p>
                                <p className={`${tillana.className} text-[1.9vw] lg:text-[20px] text-yellow-200 mt-[-2px]`}>अलगद बांधलेली.</p>
                            </div>
                            {/* image ram-sita */}
                            <div className="w-[72%] h-[70%] mx-auto  mt-[13%]">
                                <Image
                                    src="/ram-sita.png"
                                    alt="ram-sita image"
                                    width={500}
                                    height={500}
                                    className="h-full"
                                />
                            </div>
                        </div>
                        <div className={`${gotu.className}  mt-2 flex justify-center text-[2vw] md:text-[17px] text-yellow-200`}>
                            <p className="mr-1 font-extrabold text-white">टिप : </p>
                            <p className="">आपली उपस्थिती हाच अनमोल आहेर....</p>
                        </div>
                    </div>

                    {/* second section template============================================================================================================= */}
                    <div
                        ref={containerRef}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        className=" h-full w-[50%] flex justify-center items-center text-black">
                        <div className=" w-[95%] h-[98%] relative">
                            <Image
                                src="/white-frame-yellow.png"
                                alt=""
                                width={500}
                                height={500}
                                className="h-full"
                            />

                            <div data-draggable={globalEdit&& true} className="select-none touch-none w-[10vw] lg:w-[120px] absolute top-[4%] right-[10%] z-[60]">
                                <Image
                                    draggable={false}
                                    src="/haladkunku.png"
                                    alt=""
                                    width={500}
                                    height={500}
                                    />
                            </div>

                            <div data-draggable={globalEdit&& true} className="select-none touch-none w-[6vw] lg:w-[70px] absolute top-[25.5%] left-[20%] z-50">
                                <Image
                                    draggable={false}
                                    src="/first_wedding_elephant.png"
                                    alt=""
                                    width={500}
                                    height={500}
                                    />
                            </div>

                            <div data-draggable={globalEdit&& true} className="select-none touch-none w-[6vw] lg:w-[70px] absolute top-[25.5%] right-[20%] z-50">
                                <Image
                                    draggable={false}
                                    src="/first_wedding_elephant.png"
                                    alt=""
                                    width={500}
                                    height={500}
                                    className="scale-x-[-1]"
                                    />
                            </div>

                            <div className="w-full absolute -top-[7px] md:-top-4 flex justify-center items-center">
                                <div data-draggable={globalEdit&& true} className="select-none touch-none w-[15%]">
                                    <Image
                                        draggable={false}
                                        src="/ganeshWhite1.png"
                                        alt="top ganesha image"
                                        width={500}
                                        height={500}
                                    />
                                </div>
                            </div>
                            <div className={` w-full h-[4%] absolute top-[9%] text-[1.1vw] lg:text-[13px] text-center ${gotu.className} pt-[1px]`}>
                                <p className=" select-none touch-none" data-draggable={globalEdit&& true}>|| श्री गणेशाय नमः ||</p>
                            </div>

                            <div className={`z-30 w-full h-[4%] absolute top-[11.9%] flex justify-center items-center`}>
                                <p data-draggable={globalEdit&& true} className="select-none touch-none w-[50%] text-center text-[1.2vw] lg:text-[13px] pl-[3%] lg:pl-[12px] font-bold">चि.सौ.कां</p>
                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: true, name2: false, relative1: false, relative2: false, date: false, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: false }))} className={`select-none touch-none w-full h-[9%] absolute top-[13.5%] flex justify-center items-center`}>
                                <div

                                    style={{
                                        fontSize: `${size.name1 == 100 ? undefined : `${size.name1}px`}`
                                    }}
                                    className={` ${sura.className} ${activate.name1 ? "border border-white" : "none"} text-red-500 text-[4.5vw] lg:text-[50px] overflow-hidden`}>
                                    {data.name1}
                                    {/* pencil icon */}
                                    {
                                        activate.name1 &&
                                        <div onMouseDown={(e) => {
                                            setCurrentField("name1");
                                            setCurrentSize("name1");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className="absolute right-[20%] top-0 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-1.6 sm:size-4 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>

                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: false, relative1: true, relative2: false, date: false, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: false }))} className={`select-none touch-none w-full h-[9%] absolute px-[10%] lg:px-[50px] top-[20%] flex justify-center items-center`}>
                                <div
                                    style={{
                                        fontSize: `${size.relative1 == 100 ? undefined : `${size.relative1}px`}`
                                    }}
                                    className={`${sura.className} ${activate.relative1 ? "border border-white" : "none"} text-center text-[1vw] lg:text-[10px] whitespace-pre-wrap break-words`}>
                                    {data.relative1}
                                    {
                                        activate.relative1 &&
                                        <div onMouseDown={() => {
                                            setIsBigField(true)
                                            setCurrentField("relative1");
                                            setCurrentSize("relative1");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className="absolute right-[8%] top-0 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-2 sm:size-4 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={` w-full h-[4%] absolute top-[27%] flex justify-center items-center`}>
                                <p data-draggable={globalEdit&& true} className="select-none touch-none w-[50%] text-center text-[1.2vw] lg:text-[13px] pl-[3%] lg:pl-[12px] font-bold">चि.</p>
                            </div>

                            <div onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: true, relative1: false, relative2: false, date: false, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: false }))} className={` w-full h-[9%] absolute top-[29%] flex justify-center items-center`}>
                                <div
                                    data-draggable={globalEdit&& true}
                                    style={{
                                        fontSize: `${size.name2 == 100 ? undefined : `${size.name2}px`}`
                                    }}
                                    className={`select-none touch-none ${sura.className} ${activate.name2 ? "border border-white" : "none"} text-red-500 text-[4.5vw] lg:text-[50px] overflow-hidden`}>
                                    {data.name2}
                                    {/* pencil icon */}
                                    {
                                        activate.name2 &&
                                        <div onMouseDown={() => {
                                            setCurrentField("name2");
                                            setCurrentSize("name2");
                                            // setEdit(() => ({ name1:false, name2: true }))
                                            setEdit(true)
                                        }
                                        } className="absolute right-[20%] top-0 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-2 sm:size-4 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: false, relative1: false, relative2: true, date: false, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: false }))} className={`select-none touch-none w-full h-[9%] absolute px-[10%] lg:px-[50px] top-[35.5%] flex justify-center items-center`}>
                                <div
                                    style={{
                                        fontSize: `${size.relative2 == 100 ? undefined : `${size.relative2}px`}`
                                    }}
                                    className={`${sura.className} ${activate.relative2 ? "border border-white" : "none"} text-center text-[1vw] lg:text-[10px] whitespace-pre-wrap break-words`}>
                                    {data.relative2}
                                    {
                                        activate.relative2 &&
                                        <div onMouseDown={() => {
                                            setIsBigField(true)
                                            setCurrentField("relative2");
                                            setCurrentSize("relative2");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className="absolute right-[8%] top-0 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-1.5 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={` w-full h-[13%] absolute lg:px-[50px] top-[42.3%] flex justify-center items-center`}>
                                <div data-draggable={globalEdit&& true} className="select-none touch-none w-[60%] h-full flex justify-center lg:gap-3">
                                    <Image
                                        data-draggable={globalEdit&& true}
                                        draggable={false}
                                        src="/right-man.png"
                                        alt="shubha-vivaha-image"
                                        width={200}
                                        height={200}
                                        className=""
                                    />
                                    <Image
                                        data-draggable={globalEdit&& true}
                                        draggable={false}
                                        src="/shubha-vivaha-img.png"
                                        alt="shubha-vivaha-image"
                                        width={200}
                                        height={200}
                                    />
                                    <Image
                                        data-draggable={globalEdit&& true}
                                        draggable={false}
                                        src="/left-man.png"
                                        alt="shubha-vivaha-image"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: false, relative1: false, relative2: false, date: true, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: false }))} className={`select-none touch-none w-full h-[4%] absolute top-[55.5%] flex justify-center items-center`}>
                                <div
                                    style={{
                                        fontSize: `${size.date == 100 ? undefined : `${size.date}px`}`
                                    }}
                                    className={`${sura.className} ${activate.date ? "border border-white" : "none"} text-center text-[1.4vw] lg:text-[15px] whitespace-pre-wrap break-words`}>
                                    {data.date}
                                    {
                                        activate.date &&
                                        <div onMouseDown={() => {

                                            setCurrentField("date");
                                            setCurrentSize("date");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className="absolute right-[8%] -top-1 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-1.5 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div data-draggable={globalEdit&& true} className={`select-none touch-none w-full h-[3%] absolute top-[59.5%] flex justify-center items-center`}>
                                <p className={`${sura.className} text-center text-[1vw] lg:text-[10px] whitespace-pre-wrap break-words`}>या शुभमुहूर्तावर करण्याचे योजिले आहे. तरी आपली उपस्थिती प्रार्थनीय आहे.</p>
                            </div>

                            <div className={` w-full h-[4%] absolute top-[62.7%] flex justify-center items-center`}>

                                <div data-draggable={globalEdit&& true} className="select-none touch-none w-[30%]  flex justify-center">
                                    <Image
                                        draggable={false}
                                        src="/vivaha-sthal.png"
                                        alt="shubha-vivaha-image"
                                        width={200}
                                        height={200}
                                    />
                                </div>

                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: false, relative1: false, relative2: false, date: false, karyalaya: true, karyalayaAddress: false, haladDate: false, nimantrak: false }))} className={`select-none touch-none w-full h-[3%] absolute top-[67.3%] flex justify-center items-center`}>
                                <div
                                    style={{
                                        fontSize: `${size.karyalaya == 100 ? undefined : `${size.karyalaya}px`}`
                                    }}
                                    className={`${sura.className} ${activate.karyalaya ? "border border-white" : "none"} text-center text-[1.5vw] lg:text-[15px] whitespace-pre-wrap break-words`}>
                                    {data.karyalaya}
                                    {
                                        activate.karyalaya &&
                                        <div onMouseDown={() => {

                                            setCurrentField("karyalaya");
                                            setCurrentSize("karyalaya");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className=" absolute right-[8%] -top-1 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-1.5 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: false, relative1: false, relative2: false, date: false, karyalaya: false, karyalayaAddress: true, haladDate: false, nimantrak: false }))} className={`select-none touch-none w-full h-[2%] absolute top-[70.9%] flex justify-center items-center`}>
                                <div
                                    style={{
                                        fontSize: `${size.karyalayaAddress == 100 ? undefined : `${size.karyalayaAddress}px`}`
                                    }}
                                    className={`${sura.className} ${activate.karyalayaAddress ? "border border-white" : "none"} text-center text-[0.9vw] lg:text-[9px] whitespace-pre-wrap break-words`}>
                                    {data.karyalayaAddress}
                                    {
                                        activate.karyalayaAddress &&
                                        <div onMouseDown={() => {

                                            setCurrentField("karyalayaAddress");
                                            setCurrentSize("karyalayaAddress");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className=" absolute right-[10%] -top-1 md:-top-2 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-1.5 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={` w-full h-[4%] absolute top-[72.9%] flex justify-center items-center`}>

                                <div data-draggable={globalEdit&& true} className="select-none touch-none w-[30%]  flex justify-center">
                                    <Image
                                        draggable={false}
                                        src="/halad.png"
                                        alt="shubha-vivaha-image"
                                        width={200}
                                        height={200}
                                    />
                                </div>

                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: false, relative1: false, relative2: false, date: false, karyalaya: false, karyalayaAddress: false, haladDate: true, nimantrak: false }))} className={`select-none touch-none w-full h-[2%] absolute top-[78%] flex justify-center items-center`}>
                                <div
                                    style={{
                                        fontSize: `${size.haladDate == 100 ? undefined : `${size.haladDate}px`}`
                                    }}
                                    className={`${sura.className} ${activate.haladDate ? "border border-white" : "none"} text-center text-[0.9vw] lg:text-[9px] whitespace-pre-wrap break-words`}>
                                    {data.haladDate}
                                    {
                                        activate.haladDate &&
                                        <div onMouseDown={() => {

                                            setCurrentField("haladDate");
                                            setCurrentSize("haladDate");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className=" absolute right-[15%] -top-1 md:-top-2 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-1.5 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={` w-full h-[4%] absolute top-[80.9%] flex justify-center items-center`}>
                                <div data-draggable={globalEdit&& true} className="select-none touch-none w-[25%]  flex justify-center">
                                    <Image
                                        draggable={false}
                                        src="/nimantrak.png"
                                        alt="shubha-vivaha-image"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            </div>

                            <div data-draggable={globalEdit&& true} onClick={() => globalEdit && setActivate(() => ({ name1: false, name2: false, relative1: false, relative2: false, date: false, karyalaya: false, karyalayaAddress: false, haladDate: false, nimantrak: true }))} className={`select-none touch-none w-full h-[5%] absolute top-[85.5%] flex justify-center items-center`}>
                                <div
                                    style={{
                                        fontSize: `${size.nimantrak == 100 ? undefined : `${size.nimantrak}px`}`
                                    }}
                                    className={`${sura.className} ${activate.nimantrak ? "border border-white" : "none"} w-[50%] text-center text-[2vw] lg:text-[20px] whitespace-pre-wrap break-words`}>
                                    {data.nimantrak}
                                    {
                                        activate.nimantrak &&
                                        <div onMouseDown={() => {

                                            setCurrentField("nimantrak");
                                            setCurrentSize("nimantrak");
                                            // setEdit(() => ({ name1: true,name2:false }))
                                            setEdit(true)

                                        }
                                        } className=" absolute right-[15%] top-0 md:-top-1 w-[3vw] h-[3vw] lg:w-[30px] lg:h-[30px] bg-green-400 rounded-xl flex flex-col justify-center items-center">
                                            <FiEdit className="size-1.5 md:size-4" color="black" />
                                        </div>
                                    }
                                </div>
                            </div>

                            {/*  data input section  */}
                            {edit && (
                                <div className="fixed inset-0 lg:bg-black/40 lg:backdrop-blur-sm flex justify-center items-center z-[100]">

                                    {/* Modal Box */}
                                    <div data-draggable={globalEdit&& true} className={`z-[100] select-none touch-none bg-white rounded-xl w-[100%] ${isBigField ? "h-[200px]" : ""} max-w-md p-5 relative shadow-lg flex justify-center items-center flex-col`}>

                                        {/* Close Button */}
                                        <button
                                            onMouseDown={() => {
                                                if (!currentField) return;

                                                // setEdit((prev) => ({ ...prev, [currentField]: false }));
                                                setEdit(false);
                                                setActivate((prev) => ({ ...prev, [currentField]: false }));
                                                setCurrentField(null);
                                            }}
                                            className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-black"
                                        >
                                            ✕
                                        </button>

                                        {/* Input */}
                                        {
                                            !isBigField ? <input
                                                type="text"
                                                value={currentField ? data[currentField] : ""}
                                                onChange={(e) => {
                                                    if (!currentField) return;

                                                    setData((prev) => ({
                                                        ...prev,
                                                        [currentField]: e.target.value,
                                                    }));
                                                }}
                                                className="w-[80%] rounded-lg px-3 py-2"
                                            />
                                                :
                                                <textarea

                                                    value={currentField ? data[currentField] : ""}
                                                    onChange={(e) => {
                                                        if (!currentField) return;

                                                        setData((prev) => ({
                                                            ...prev,
                                                            [currentField]: e.target.value,
                                                        }));
                                                    }}
                                                    className="w-[75%] px-1 bg-slate-200 rounded-lg border-none resize-none text-black placeholder:text-gray-400"
                                                />
                                        }


                                        <input
                                            type="number"
                                            value={currentSize ? size[currentSize] : ""}
                                            onChange={(e) => {
                                                if (!currentSize) return;

                                                setSize((prev) => ({
                                                    ...prev,
                                                    [currentSize]: e.target.value,
                                                }));
                                            }}
                                            className="w-[80%]  rounded-lg px-3 py-2"
                                        />

                                        {/* Save */}
                                        <button
                                            onClick={() => {
                                                // setEdit((prev) => ({ ...prev, name1: false }));
                                                setEdit(false);
                                                setActivate((prev) => ({ ...prev, name1: false }));
                                            }}
                                            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            )}



                        </div>
                    </div>

                </div>
            </section>
        </DesignWraper>
    )
}
