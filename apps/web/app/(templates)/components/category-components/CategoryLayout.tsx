interface propTypes{
    category:string
}

export function CategoryLayout({category}:propTypes){

    return(
        <>
            <div className="flex justify-center items-center flex-row pt-2 gap-3">
                <p className="text-4xl font-bold">Tampletes</p>
            </div>
            <div className="text-sm flex justify-center items-center mt-3 gap-2 font-semibold">
                <p className="">Category</p>
                <p className="">-</p>
                <h1 className="">{category}</h1>
            </div>
            <div className="w-[50%]  mx-auto text-center mt-4">
                <p className="font-thin">Select Your Favorite Template, Personalize with Details, and Share with Friends and Family — All in Just 5 Minutes!</p>
            </div>
        </>
    )
}