import { Image, Spacer } from "@nextui-org/react"



export const Introduction = () => {
    return (
        <div className="grid grid-cols-1  md:grid-cols-2  gap-4 h-[540px]">
            <div className="bg-slate-50 md:rounded-br-[200px] ps-12 pt-12 p-6">
                <div className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                    <div className="mb-3">Sharing to <span className="text-teal-400 dark:text-green-300">EARN</span>  and 
                    </div> 
                    <div  className="mb-3">
                     build up  <span className="text-teal-400 dark:text-teal-300">COMMUNITY</span>
                    </div>
                    {/* <div  className="mb-3"> 
                       
                    </div> */}

                  
                </div>

                <div className="text-md font-normal text-gray-900 lg:text-lg dark:text-gray-400 me-24">Our platform with method sharing to learn, sharing to earn, bring everyone of us vibrant classroom </div>
                <Spacer y={8}/>

                <div className="flex gap-16">
                    <div >
                        <div className="text-xl  text-gray-900 font-bold w-[60px]">
                        120+
                            <div className=" border-b-2 pb-2 border-gray-900 w-[40px]"/>
                        </div>
                        <div className=" w-[80px] text-sm font-normal text-gray-500 lg:text-sm dark:text-gray-400  pt-2">Learning course</div>
                    </div>

                    <div>
                        <div className="text-xl  text-gray-900 font-bold w-[60px]">
                        700+
                            <div className=" border-b-2 pb-2 border-gray-900 w-[40px]"/>
                        </div>
                        <div className=" w-[80px] text-sm font-normal text-gray-500 lg:text-sm dark:text-gray-400  pt-2">Students join </div>

                    </div>
                    <div>
                        <div className="text-xl  text-gray-900 font-bold w-[60px]">
                        50+
                            <div className=" border-b-2 pb-2 border-gray-900 w-[40px]"/>
                        </div>
                        <div className=" w-[80px] text-sm font-normal text-gray-500 lg:text-sm dark:text-gray-400  pt-2">Teacher</div>

                    </div>
                </div>
                

            </div>
            <div >
                <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png"
                    alt="Next.js Logo"
                    width={360}
                    height={74}
                />
            </div>
        </div>

    )
}