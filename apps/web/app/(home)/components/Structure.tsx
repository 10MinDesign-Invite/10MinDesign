import { auth } from "@/auth";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { Header } from "./Header";

export async function Structure(){
    const authData = await auth()
    return(
        <>  <Header authData={authData} disableAnimation=""/>
            <Hero/>
            <Features/>
        </>
    )

}