import { Features } from "./Features";
import { Hero } from "./Hero";
import { Header } from "./Header";

export async function Structure(){
    return(
        <>  <Header disableAnimation=""/>
            <Hero/>
            <Features/>
        </>
    )

}